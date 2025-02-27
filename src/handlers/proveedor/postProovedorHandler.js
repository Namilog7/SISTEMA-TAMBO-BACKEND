const crudController = require("../../controllers/crudController");
const { Proveedor } = require("../../db");

const postProveedorHandler = async (req, res) => {
    const postProveedor = crudController(Proveedor);
    const { nombre, contacto_1, contacto_2, localidad, saldo } = req.body
    try {
        const response = await postProveedor.create({ nombre, contacto_1, contacto_2, localidad, saldo })
        return res.json({
            message: "Se creo el proovedor",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = postProveedorHandler