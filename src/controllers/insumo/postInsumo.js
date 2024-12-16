const { Insumo } = require("../../db");

const postInsumo = async (obj) => {
    const newInsumo = await Insumo.create(obj)
    return {
        message: "Se creo el insumo",
        newInsumo
    }
}

module.exports = postInsumo