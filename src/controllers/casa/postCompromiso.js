const { CompromisoDePago } = require("../../db");

const postCompromiso = async ({ nombre_servicio, fecha, id_propietario }) => {

    const nuevoCompromiso = await CompromisoDePago.create({ nombre_servicio, fecha, id_propietario });
    if (!nuevoCompromiso) throw new Error("Algo fallo en postCompromiso")

    return nuevoCompromiso

}

module.exports = postCompromiso