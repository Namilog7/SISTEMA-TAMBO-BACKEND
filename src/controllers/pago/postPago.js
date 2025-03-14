const { Pago } = require("../../db");

const postPago = async ({ detalle, fecha, id_cliente, id_proveedor }, transaction) => {
    const nuevoPago = await Pago.create({
        detalle,
        fecha,
        id_cliente,
        id_proveedor
    }, { transaction })
    if (!nuevoPago) throw new Error("Algo salio mal en : postPago")
    return nuevoPago
}

module.exports = postPago