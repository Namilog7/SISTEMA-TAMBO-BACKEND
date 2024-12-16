const { ProduccionLeche } = require("../../db");
const crudController = require("../../controllers/crudController")

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche)
    const { litros, fecha, hora_recoleccion, hora_carga, usuario_carga, animales, aclaracion, estado } = req.body
    const id_tambo = 1;
    try {
        const response = await postProduccionLeche.create({ litros, fecha, hora_recoleccion, hora_carga, usuario_carga, animales, id_tambo, aclaracion, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postProduccionLecheHandler