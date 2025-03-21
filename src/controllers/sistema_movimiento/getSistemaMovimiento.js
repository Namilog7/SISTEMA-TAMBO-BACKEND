const { Sistema_movimiento } = require("../../db");

const getSistemaMovimiento = async () => {
    const movimientos = await Sistema_movimiento.findAll({})
    if (!movimientos) return { message: "Todavia no hay movimientos" }
    return movimientos
}
module.exports = getSistemaMovimiento