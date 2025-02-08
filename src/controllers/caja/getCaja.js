const { Caja } = require("../../db");

const getCaja = async (id) => {
    const caja = await Caja.findOne({
        where: { id: id }
    })
    return caja
}

module.exports = getCaja