const { ProduccionLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const putProduccionLecheHandler = async (req, res) => {
    const putProduccionLeche = crudController(ProduccionLeche);
    const { id, fecha, hora_recoleccion, hora_carga, litros, usuario_carga, id_ganado } = req.body;
    try {
        const response = await putProduccionLeche.update({ id, fecha, hora_recoleccion, hora_carga, litros, usuario_carga, id_ganado })
        console.log(response)
        res.json({ message: `Los datos de la recoleccion fueron actualizados` })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = putProduccionLecheHandler