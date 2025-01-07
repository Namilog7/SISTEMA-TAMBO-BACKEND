const getCaja = require("../../controllers/caja/getCaja");
const crudController = require("../../controllers/crudController")
const { Caja } = require("../../db");

const getCajaHandler = async (req, res) => {
    const { id } = req.query
    const getAllCaja = crudController(Caja)
    try {
        const response = id ? await getCaja(id) : await getAllCaja.readAll()
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports = getCajaHandler