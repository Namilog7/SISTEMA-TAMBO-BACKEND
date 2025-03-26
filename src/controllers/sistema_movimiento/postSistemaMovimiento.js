const { Sistema_movimiento } = require("../../db");

const postSistemaMovimiento = async ({ user_tipo, fecha, nombre_sector, movimiento }, transaction) => {
    const movimientoSistema = await Sistema_movimiento.create({
        usuario: `${user_tipo} ${nombre_sector}`,
        ultimo_movimiento: movimiento,
        fecha: fecha
    }, { transaction })
    return movimientoSistema
}

module.exports = postSistemaMovimiento