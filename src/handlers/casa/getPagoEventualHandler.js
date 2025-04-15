const { PagoEventual } = require("../../db");
const crudController = require("../../controllers/crudController")

const getPagoEventualHandler = async (req, res) => {
    const getPagos = crudController(PagoEventual);
    try {
        const allPagos = await getPagos.readAll()
        res.json(allPagos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getPagoEventualHandler