const { Comprobante } = require("../../db");
const crudController = require("../../controllers/crudController");

const getComprobanteHandler = async (req, res) => {
    const allComprobantes = crudController(Comprobante);
    try {
        const comprobantes = await allComprobantes.readAll()
        res.json(comprobantes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getComprobanteHandler
