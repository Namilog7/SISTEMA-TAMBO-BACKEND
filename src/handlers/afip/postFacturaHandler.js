const sendFacturaAFIP = require("../../controllers/afip/sendFacturaAfip");
const QRCode = require("qrcode");
const cargarDatosATablaArca = require("../../controllers/afip/cargarDatosATablasArca");

const postFacturaHandler = async (req, res) => {
    const { datos, alicuotas, items, tributos } = req.body;

    try {
        const responseContent = await sendFacturaAFIP({ datos, alicuotas, items, tributos });

        // convertimos el json en base64
        const jstonString = JSON.stringify(responseContent.json_data);
        const jsonBase64 = btoa(jstonString);

        // armamos la url
        const url_qr = `https://www.arca.gob.ar/fe/qr/?p=${jsonBase64}`;
        console.log(url_qr);

        let srv_qr;
        // generamos el QR
        QRCode.toString(
            url_qr,
            {
                type: "svg",
                errorCorrectionLevel: "L", // L (baja) a H (alta)
                scale: 40, // Escala del tamaño de cada "módulo" (default: 4)
                quality: 0.3,
                margin: 2, // Margen alrededor del QR (en módulos)
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
                maskPattern: 7,
            },
            function (err, svg) {
                if (err) throw err;
                srv_qr = svg;
            }
        );

        cargarDatosATablaArca(
            {
                ...datos,
                cae: responseContent.cae,
                fechaVencimientoCAE: responseContent.fechaVencimientoCAE,
                qr: srv_qr,
                punto_venta: responseContent.punto_venta,
                numeroComprobante: responseContent.numeroComprobante,
            },
            items,
            tributos
        );

        res.status(200).json({
            cae: responseContent.cae,
            fechaVencimientoCAE: responseContent.fechaVencimientoCAE,
            punto_venta: responseContent.punto_venta,
            svgQR: srv_qr,
            numeroComprobante: responseContent.numeroComprobante,
        });
    } catch (error) {
        console.error("Error al enviar factura a AFIP:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postFacturaHandler;
