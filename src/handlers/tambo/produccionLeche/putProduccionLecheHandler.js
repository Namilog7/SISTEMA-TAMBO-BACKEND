const { ProduccionLeche } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const putProduccionLecheHandler = async (req, res) => {
    const putProduccionLeche = crudController(ProduccionLeche);
    const { id, fecha, hora_recoleccion, hora_carga, litros, usuario_carga, cantidad_animales, estado, acalaracion } = req.body;
    try {
        const response = await putProduccionLeche.update({ id, fecha, hora_recoleccion, hora_carga, litros, usuario_carga, cantidad_animales, estado, acalaracion });
        if (response.error) {
            return res.json({
                message: "Algo salio mal"
            })
        }
        return res.json({
            message: `Los datos de la recoleccion se actualizaron`,
            response
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = putProduccionLecheHandler