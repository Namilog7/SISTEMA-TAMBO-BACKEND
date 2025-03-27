const postMovimientoRollo = require("../../controllers/agricultura/postMovimientoRollo");

const postMovimientoRolloHandler = async (req, res) => {
    const { tipo_movimiento, rollos_afectados, archivo } = req.body
    try {
        const movimiento = await postMovimientoRollo({ tipo_movimiento, rollos_afectados, archivo }, transaction);
        res.json(movimiento)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postMovimientoRolloHandler