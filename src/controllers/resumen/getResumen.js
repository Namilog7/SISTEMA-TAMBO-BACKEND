const { ResumenCuenta } = require("../../db");

const getResumen = async ({ id_cliente, id_proveedor }) => {
    let resumen
    if (id_cliente) {
        resumen = await ResumenCuenta.findAll({
            where: {
                id_cliente: id_cliente
            }
        })
    }
    if (id_proveedor) {
        resumen = await ResumenCuenta.findAll({
            where: {
                id_proveedor: id_proveedor
            }
        })
    }
    return resumen
}

module.exports = getResumen