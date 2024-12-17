const { VentaLeche } = require("../../db");

const getVentaLeche = async (id_tambo) => {

    const ventaLeche = await VentaLeche.findAll({
        where: {
            id_tambo: id_tambo
        }
    })
    return ventaLeche

}

module.exports = getVentaLeche