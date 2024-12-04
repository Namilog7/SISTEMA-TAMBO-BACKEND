const { Tambo } = require("../../db");

const putTambo = async ({ dueño, localidad, contacto, id }) => {
    let updateTambo = await Tambo.findByPk(id)
    if (!updateTambo) return { message: "No hay registros" }
    await updateTambo.update({
        dueño,
        localidad,
        contacto
    })
    return { message: `Se actualizaron los datos del tambo de ${dueño}` }
}

module.exports = putTambo