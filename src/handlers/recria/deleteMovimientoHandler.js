const { Movimiento_anotacion } = require("../../db");
const crudController = require("../../controllers/crudController")

const deleteMovimientoHandler = async (req, res) => {
    const { id } = req.params
    const deleteMovimiento = crudController(Movimiento_anotacion)
    try {
        const result = await deleteMovimiento.delete(id)
        return res.json({
            result
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteMovimientoHandler