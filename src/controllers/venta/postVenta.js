const { Venta } = require("../../db");

const postVenta = async ({ id_cliente, monto, fecha }, transaction) => {

    const venta = await Venta.create({
        id_cliente,
        monto,
        fecha
    }, { transaction })

    return venta
}

module.exports = postVenta
