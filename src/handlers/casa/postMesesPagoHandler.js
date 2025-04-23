const { MesesCompromiso } = require("../../db");
const crudController = require("../../controllers/crudController");

const postMesesPagoHandler = async (req, res) => {
    const { id_compromiso, monto, fecha } = req.body
    const postMesesPago = crudController(MesesCompromiso);
    try {
        const nuevoPago = await postMesesPago.create({ id_compromiso, monto, fecha, estado: "PAGADO" })
        res.json(nuevoPago)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postMesesPagoHandler 