const { RetiroLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const retiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, id_tambo, hora_carga, hora_retiro, aclaracion, usuario_carga } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await postRetiroLeche.create({ cantidad, fecha, liquidado, id_tambo, hora_carga, hora_retiro, aclaracion, usuario_carga })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = retiroLecheHandler