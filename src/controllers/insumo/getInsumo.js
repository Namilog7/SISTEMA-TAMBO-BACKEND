const { Insumo } = require("../../db");

const getInsumo = async (id_sector) => {
    let response;
    const insumo = await Insumo.findAll({
        where: { id_sector: id_sector }
    })
    if (!insumo.length) {
        response = { message: "No hay registros" }
    } else {
        response = insumo
    }
    return response
}

module.exports = getInsumo