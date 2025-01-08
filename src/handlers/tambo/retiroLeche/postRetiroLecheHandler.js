const { RetiroLeche } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const postRetiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, hora_carga, hora_retiro, encargado_retiro, aclaracion, usuario_carga, estado, id_cliente, id_liquidacion } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await postRetiroLeche.create({ cantidad, fecha, liquidado, hora_carga, hora_retiro, aclaracion, usuario_carga, estado, id_cliente, id_liquidacion, encargado_retiro })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postRetiroLecheHandler