const postMovimientoRollo = require("../../controllers/agricultura/postMovimientoRollo");
const { Rollo, conn } = require("../../db");

const postRolloHandler = async (req, res) => {

    const { tipo, cantidad, precio, archivo } = req.body
    const transaction = await conn.transaction()

    try {
        const nuevoRollo = await Rollo.create({
            tipo,
            cantidad,
            precio
        }, { transaction })
        const movimiento = await postMovimientoRollo({
            rollos_afectados: [{ tipo, cantidad, precio }],
            tipo_movimiento: "INGRESO",
            archivo
        }, transaction)

        res.json({
            nuevoRollo,
            movimiento
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postRolloHandler