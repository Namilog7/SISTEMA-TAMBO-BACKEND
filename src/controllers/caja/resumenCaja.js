const { ResumenCaja } = require("../../db");

const resumenCaja = async ({ tipo, detalle, fecha, importe, arrayMetodo }) => {
    const metodos = arrayMetodo.join(" ")
    const resumen = await ResumenCaja.create({
        tipo,
        detalle,
        fecha,
        importe,
        metodos_pago: metodos
    })
    return resumen
}

module.exports = resumenCaja