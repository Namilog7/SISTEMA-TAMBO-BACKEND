const crudController = require("../../controllers/crudController");
const { Proovedor } = require("../../db");

const putProovedorHandler = async (req, res) => {
    const putProovedor = crudController(Proovedor);
    const { id, nombre, contacto_1, contacto_2, localidad } = req.body
    try {
        const response = await putProovedor.update({ id, nombre, contacto_1, contacto_2, localidad })
        return res.json({
            message: "Se actualizo el proovedor",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = putProovedorHandler