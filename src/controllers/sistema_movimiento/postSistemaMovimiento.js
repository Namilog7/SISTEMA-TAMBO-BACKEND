const { Sistema_movimiento } = require("../../db");

const postSistemaMovimiento = async ({ user_tipo, fecha, nombre_sector, movimiento }, transaction) => {
    const movimiento = await Sistema_movimiento.create({
        usuario: `${user_tipo} ${nombre_sector}`,
        ultimo_movimiento: movimiento,
        fecha: fecha
    }, { transaction })
    return movimiento
}

module.exports = postSistemaMovimiento