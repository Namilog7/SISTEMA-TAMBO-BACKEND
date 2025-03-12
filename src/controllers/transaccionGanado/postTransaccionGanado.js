const { TransaccionGanado } = require("../../db");

const postTransaccionGanado = async ({
    tipo_operacion,
    comprador,
    contacto,
    precio_kilo,
    monto,
    cantidad,
    fecha,
    genero,
    peso_total,
    comprobante,
}, transaction) => {
    const nuevaTransaccion = await TransaccionGanado.create({
        tipo_operacion,
        comprador,
        contacto,
        precio_kilo,
        monto,
        cantidad,
        fecha,
        genero,
        peso_total,
        comprobante,
    }, { transaction });

    return nuevaTransaccion
}

module.exports = postTransaccionGanado
