const { MesesPago } = require("../../db");
const crudController = require("../../controllers/crudController");

const getCompromisoPagoHandler = async (req, res) => {
    const allCompromisos = crudController(MesesPago);
    try {
        const compromisos = await allCompromisos.readAll()
        res.json(compromisos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCompromisoPagoHandler