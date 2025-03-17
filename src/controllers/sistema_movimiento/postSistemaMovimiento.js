const { Sistema_movimiento } = require("../../db");

const postSistemaMovimiento = async ({ user_tipo, fecha, nombre_sector, actividad, hora }, transaction) => {
    let movimiento = await Sistema_movimiento.create({
        ultimo_movimiento: `${user_tipo} | ${nombre_sector} | ${actividad} | ${fecha} | ${hora}`
    }, { transaction })
    return movimiento
}

module.exports = postSistemaMovimiento