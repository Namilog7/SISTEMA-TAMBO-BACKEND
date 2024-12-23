const crudController = require("../../controllers/crudController");
const { ControlLechero } = require("../../db");

const getControlLecheroHandler = async (req, res) => {
    const getControlLechero = crudController(ControlLechero)
    try {
        const response = await getControlLechero.readAll()
        return res.json(response)
    } catch (error) {
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = getControlLecheroHandler