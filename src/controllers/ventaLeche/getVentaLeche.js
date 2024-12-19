const { VentaLeche } = require("../../db");

const getVentaLeche = async () => {

    const ventaLeche = await VentaLeche.findAll()
    return ventaLeche

}

module.exports = getVentaLeche