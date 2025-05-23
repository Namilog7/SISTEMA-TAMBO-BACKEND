const forge = require('node-forge');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const { TokenSignAfip } = require('../../db'); // Ajustá el path según tu estructura

const CERT_PATH = path.join(__dirname, '../../certs/certificado.crt');
const KEY_PATH = path.join(__dirname, '../../certs/miClavePrivada.key');

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

const generateTokenSign = async () => {
    try {
        const xml = generateLoginTicketRequestXML('wsfe');

        // Leer certificados
        const privateKeyPem = fs.readFileSync(KEY_PATH, 'utf8');
        const certificatePem = fs.readFileSync(CERT_PATH, 'utf8');

        // Crear PKCS#7 (CMS) firmado
        const p7 = forge.pkcs7.createSignedData();
        p7.content = forge.util.createBuffer(xml, 'utf8');
        p7.addCertificate(certificatePem);
        p7.addSigner({
            key: forge.pki.privateKeyFromPem(privateKeyPem),
            certificate: forge.pki.certificateFromPem(certificatePem),
            digestAlgorithm: forge.pki.oids.sha256,
            authenticatedAttributes: [
                { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
                { type: forge.pki.oids.messageDigest },
                { type: forge.pki.oids.signingTime, value: new Date() }
            ],
        });

        p7.sign();

        const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
        const base64Cms = forge.util.encode64(der);

        // Enviar a AFIP
        const { data } = await axios.post(
            'https://wsaahomo.afip.gov.ar/ws/services/LoginCms',
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
                    'Content-Type': 'text/xml; charset=utf-8',
                    'SOAPAction': ''
                }
            }
        );

        const parsed = await parseStringPromise(data, { explicitArray: false });
        const loginResponse = parsed['soapenv:Envelope']['soapenv:Body']['loginCmsResponse']['loginCmsReturn'];

        const loginParsed = await parseStringPromise(loginResponse, { explicitArray: false });

        const token = loginParsed.loginTicketResponse.credentials.token;
        const sign = loginParsed.loginTicketResponse.credentials.sign;
        const expiration = loginParsed.loginTicketResponse.header.expirationTime;

        // Guardar o actualizar en DB
        await TokenSignAfip.upsert({
            token,
            sign,
            fechaExpiracion: new Date(expiration)
        });

        return { token, sign, fechaExpiracion: expiration };
    } catch (err) {
        console.error('Error generando token y sign:', err);
        throw err;
    }
};

module.exports = generateTokenSign;
