const postMovimientoRollo = require("../../controllers/agricultura/postMovimientoRollo");
const { conn } = require("../../db");

const postMovimientoRolloHandler = async (req, res) => {
    const { tipo_movimiento, rollos_afectados, archivo } = req.body
    const transaction = await conn.transaction();

    try {
        const movimiento = await postMovimientoRollo({ tipo_movimiento, rollos_afectados, archivo }, transaction);
        await transaction.commit()
        res.json(movimiento)
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postMovimientoRolloHandler