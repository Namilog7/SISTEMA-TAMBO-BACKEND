const { RetiroLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const postRetiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, hora_carga, hora_retiro, aclaracion, usuario_carga, estado } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await postRetiroLeche.create({ cantidad, fecha, liquidado, hora_carga, hora_retiro, aclaracion, usuario_carga, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postRetiroLecheHandler