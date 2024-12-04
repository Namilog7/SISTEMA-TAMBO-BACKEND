const { Tambo } = require("../../db")

const postTambo = async ({ dueño, localidad, contacto, id_sector }) => {
    const [tambo, created] = await Tambo.findOrCreate({
        where: { dueño, localidad, contacto },
        defaults: {
            dueño,
            localidad,
            contacto,
            id_sector
        }
    })
    if (!created) {
        return ({ message: "Este tambo ya existe" })
    }
    return tambo
}

module.exports = postTambo