const { Insumo } = require("../../db");

const putInsumo = async (obj) => {
    const { id } = obj
    const putInsumo = await Insumo.update(obj,
        {
            where: id
        }
    )
    return {
        message: "Se actualizo el insumo",
        putInsumo
    }
}

module.exports = putInsumo