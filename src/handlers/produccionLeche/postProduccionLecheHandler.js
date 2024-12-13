const { ProduccionLeche } = require("../../db");
const crudController = require("../../controllers/crudController")

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche)
    const { litros, fecha, hora_recoleccion, hora_carga, usuario_carga, animales } = req.body
    try {
        const response = await postProduccionLeche.create({ litros, fecha, hora_recoleccion, hora_carga, usuario_carga, animales })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postProduccionLecheHandler