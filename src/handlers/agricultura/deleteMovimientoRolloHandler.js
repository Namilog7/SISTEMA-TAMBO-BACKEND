const { Movimiento_rollo } = require("../../db");
const crudController = require("../../controllers/crudController");


const deleteMovimientoRolloHandler = async (req, res) => {
    const { id } = req.params;
    const deleteMovimiento = crudController(Movimiento_rollo)
    try {
        await deleteMovimiento.delete(id);
        res.json({ message: "Registro eliminado" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteMovimientoRolloHandler