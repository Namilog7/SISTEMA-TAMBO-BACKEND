const axios = require("axios");
const getValidCredentialsAfip = require("../../controllers/afip/getValidCredentialsAfip");
const { parseStringPromise } = require("xml2js");

const getCondicionIvaHandler = async (req, res) => {
    const { cuit } = req.query;

    try {
        const { token, sign } = await getValidCredentialsAfip("wsmtxca");

        // Crear el cuerpo de la solicitud en XML
        const xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ar:gov:afip:wsmtxca">
            <soapenv:Header>
                <urn:Auth>
                    <urn:token>${token}</urn:token>
                    <urn:sign>${sign}</urn:sign>
                </urn:Auth>
            </soapenv:Header>
            <soapenv:Body>
                <urn:ConsultaCondicionIVA>
                    <urn:cuit>${cuit}</urn:cuit>
                </urn:ConsultaCondicionIVA>
            </soapenv:Body>
        </soapenv:Envelope>`;

        // Realizar la solicitud
        const response = await axios.post("https://wsmtxca.afip.gob.ar/wsmtxca", xmlRequest, {
            headers: {
                "Content-Type": "text/xml",
            },
        });

        // Parsear la respuesta
        const resultado = await parseStringPromise(response.data);

        // Devolver el resultado
        res.status(200).json(resultado);
    } catch (error) {
        if (error.code === "ENOTFOUND") {
            console.error("Error: No se pudo encontrar el host. Verifica la URL.");
        } else {
            console.error("Error al solicitar condición de IVA:", error.message);
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCondicionIvaHandler;
