const { ResumenCuenta } = require("../../db");

const getResumen = async ({ id, tipo }) => {
    let resumen
    if (tipo === "CLIENTE") {
        resumen = await ResumenCuenta.findAll({
            where: {
                id_cliente: id
            }
        })
    }
    if (tipo === "PROVEEDOR") {
        resumen = await ResumenCuenta.findAll({
            where: {
                id_proveedor: id
            }
        })
    }
    return resumen
}

module.exports = getResumen