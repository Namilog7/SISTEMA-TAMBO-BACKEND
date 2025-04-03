const crudController = require("../../controllers/crudController");
const { Movimiento_rollo } = require("../../db");

const getMovimientoRolloHandler = async (req, res) => {

    const movimientoRollo = crudController(Movimiento_rollo);

    try {
        const allMovimientos = await movimientoRollo.readAll();
        res.json(allMovimientos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getMovimientoRolloHandler