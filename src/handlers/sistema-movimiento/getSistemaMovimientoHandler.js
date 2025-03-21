const getSistemaMovimiento = require("../../controllers/sistema_movimiento/getSistemaMovimiento")

const getSistemaMovimientoHandler = async (req, res) => {
    try {
        const movimientos = await getSistemaMovimiento()
        res.json(movimientos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = getSistemaMovimientoHandler