const { RetiroLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const putRetiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, id_tambo, hora_carga, hora_retiro, aclaracion, usuario_carga, id, estado } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await postRetiroLeche.update({ id, cantidad, fecha, liquidado, id_tambo, hora_carga, hora_retiro, aclaracion, usuario_carga, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putRetiroLecheHandler