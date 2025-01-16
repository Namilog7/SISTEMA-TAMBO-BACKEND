const { ProduccionLeche, Tambo } = require("../../../db");
const crudController = require("../../../controllers/crudController")

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche)
    const getTambo = crudController(Tambo)
    const { litros, fecha, hora_recoleccion, hora_carga, usuario_carga, cantidad_animales, aclaracion, estado } = req.body
    const id_tambo = getTambo.readAll().id_tambo
    console.log(id_tambo)
    try {
        const response = await postProduccionLeche.create({ litros, fecha, hora_recoleccion, hora_carga, usuario_carga, cantidad_animales, id_tambo, aclaracion, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postProduccionLecheHandler