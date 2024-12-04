const { Tambo } = require("../../db");

const getTambo = async () => {
    const tambos = await Tambo.findAll()
    if (!tambos) return { message: "Todavia no hay tambos" }
    return tambos
}

module.exports = getTambo