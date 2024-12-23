const crudController = require("../../controllers/crudController");
const { Proovedor } = require("../../db");

const postProovedorHandler = async (req, res) => {
    const postProovedor = crudController(Proovedor);
    const { nombre, contacto_1, contacto_2, localidad } = req.body
    try {
        const response = await postProovedor.create({ nombre, contacto_1, contacto_2, localidad })
        return res.json({
            message: "Se creo el proovedor",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = postProovedorHandler