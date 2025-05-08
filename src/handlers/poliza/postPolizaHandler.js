const { PolizaSeguro } = require("../../db");
const crudController = require("../../controllers/crudController");
const postCloudinary = require("../../controllers/postCloudinary");

const postPolizaHandler = async (req, res) => {
    const { numero_poliza, nombre, seccion, desde, hasta, importe, estado, cantidad_cuotas, factura_base64, afectados } = req.body
    const postPoliza = crudController(PolizaSeguro);
    try {
        let foto_factura;
        if (factura_base64) {
            foto_factura = await postCloudinary(factura_base64, "poliza_facturas");
        }
        const poliza = await postPoliza.create({ numero_poliza, nombre, seccion, desde, hasta, importe, estado, cantidad_cuotas, foto_factura, afectados })
        res.json(poliza)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postPolizaHandler