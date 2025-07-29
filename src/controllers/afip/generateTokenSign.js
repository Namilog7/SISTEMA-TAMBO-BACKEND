const forge = require("node-forge");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const { TokenSignAfip } = require("../../db");
/* 
const CERT_PATH = path.resolve(process.env.AFIP_CERT_PATH);
const KEY_PATH = path.resolve(process.env.AFIP_KEY_PATH); */7

// Decodificar Base64 a archivos temporales (Render usa /tmp/)
console.log("[DEBUG] Variables AFIP:", {
    cert: !!process.env.AFIP_CERT_BASE64,
    key: !!process.env.AFIP_KEY_BASE64
});

// Validar variables
if (!process.env.AFIP_CERT_BASE64 || !process.env.AFIP_KEY_BASE64) {
    throw new Error("❌ Configura AFIP_CERT_BASE64 y AFIP_KEY_BASE64 en Render Secrets.");
}

// Limpiar y decodificar Base64
const certBase64 = process.env.AFIP_CERT_BASE64
const keyBase64 = process.env.AFIP_KEY_BASE64

// Escribir archivos temporales
const certPath = path.join('/tmp', 'certificado.crt');
const keyPath = path.join('/tmp', 'clave_privada.key');

try {
    fs.writeFileSync(certPath, Buffer.from(certBase64, 'base64'));
    fs.writeFileSync(keyPath, Buffer.from(keyBase64, 'base64'));
    console.log("[DEBUG] Archivos escritos en:", { certPath, keyPath });
} catch (error) {
    throw new Error(`❌ Error al crear archivos: ${error.message}`);
}
const generateLoginTicketRequestXML = (service) => {
    const uniqueId = Math.floor(Date.now() / 1000);
    const generationTime = new Date(Date.now() - 600000).toISOString();
    const expirationTime = new Date(Date.now() + 600000).toISOString();

    return `
<loginTicketRequest version="1.0">
  <header>
    <uniqueId>${uniqueId}</uniqueId>
    <generationTime>${generationTime}</generationTime>
    <expirationTime>${expirationTime}</expirationTime>
  </header>
  <service>${service}</service>
</loginTicketRequest>
`.trim();
};

const generateTokenSign = async (service = "wsmtxca") => {
    try {
        const xml = generateLoginTicketRequestXML(service);

        // Leer certificados
        const privateKeyPem = fs.readFileSync(keyPath, "utf8");
        const certificatePem = fs.readFileSync(certPath, "utf8");

        // Crear PKCS#7 (CMS) firmado
        const p7 = forge.pkcs7.createSignedData();
        p7.content = forge.util.createBuffer(xml, "utf8");
        p7.addCertificate(certificatePem);
        p7.addSigner({
            key: forge.pki.privateKeyFromPem(privateKeyPem),
            certificate: forge.pki.certificateFromPem(certificatePem),
            digestAlgorithm: forge.pki.oids.sha256,
            authenticatedAttributes: [
                { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
                { type: forge.pki.oids.messageDigest },
                { type: forge.pki.oids.signingTime, value: new Date() },
            ],
        });

        p7.sign();

        const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
        const base64Cms = forge.util.encode64(der);

        // Enviar a AFIP
        const { data } = await axios.post(
            "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
          <loginCms xmlns="http://wsaa.view.sua.dvadac.desein.afip.gov">
            <in0>${base64Cms}</in0>
          </loginCms>
        </soapenv:Body>
      </soapenv:Envelope>`,
            {
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    SOAPAction: "",
                },
                timeout: 30000, // Timeout de 10 segundos
            }
        );

        const parsed = await parseStringPromise(data, { explicitArray: false });
        const loginResponse = parsed["soapenv:Envelope"]["soapenv:Body"]["loginCmsResponse"]["loginCmsReturn"];

        const loginParsed = await parseStringPromise(loginResponse, { explicitArray: false });
        const credentials = loginParsed.loginTicketResponse.credentials;
        const header = loginParsed.loginTicketResponse.header;

        if (!credentials || !header) {
            throw new Error("Respuesta inválida de AFIP: estructura de token incorrecta");
        }

        const token = credentials.token;
        const sign = credentials.sign;
        const expiration = header.expirationTime;

        // Guardar o actualizar en DB con el servicio
        await TokenSignAfip.upsert({
            token,
            sign,
            fechaExpiracion: new Date(expiration),
            service, // Guardar el servicio asociado
        });

        return { token, sign, fechaExpiracion: expiration };
    } catch (err) {
        // Manejo específico de error por token existente
        if (err.response?.data?.includes?.("coe.alreadyAuthenticated")) {
            console.warn("AFIP: Ya existe un TA válido. Recuperando de BD...");
            const existingToken = await TokenSignAfip.findOne({
                where: { service },
                order: [["fechaExpiracion", "DESC"]],
            });

            if (existingToken) {
                return {
                    token: existingToken.token,
                    sign: existingToken.sign,
                    fechaExpiracion: existingToken.fechaExpiracion,
                };
            }
            throw new Error("YA_EXISTE_TA_VIGENTE");
        }

        console.error("Error generando token y sign:", {
            message: err.message,
            response: err.response?.data || "Sin respuesta",
        });
        throw new Error("ERROR_GENERANDO_TOKEN");
    }
};

module.exports = generateTokenSign;
