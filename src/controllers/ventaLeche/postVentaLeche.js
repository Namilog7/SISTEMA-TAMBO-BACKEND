const { VentaLeche } = require("../../db");

const postVentaLeche = async (obj) => {
    const ventaLeche = await VentaLeche.create(obj)
    return {
        message: "Nueva venta agregada",
        ventaLeche
    }
}

module.exports = postVentaLeche