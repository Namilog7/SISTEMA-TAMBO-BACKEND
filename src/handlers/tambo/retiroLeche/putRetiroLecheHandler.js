const { RetiroLeche } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const putRetiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, hora_carga, hora_retiro, aclaracion, usuario_carga, estado, id_cliente, id_liquidacion, id_retiro } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const id = id_retiro.replace(/"/g, "");
        const response = await postRetiroLeche.update({ id, cantidad, fecha, liquidado, hora_carga, hora_retiro, aclaracion, usuario_carga, estado, id_cliente, id_liquidacion, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putRetiroLecheHandler