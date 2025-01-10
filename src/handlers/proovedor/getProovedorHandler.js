const crudController = require("../../controllers/crudController");
const { Proveedor } = require("../../db");

const getProveedorHandler = async (req, res) => {
    const getProveedor = crudController(Proveedor);
    try {
        const response = await getProveedor.readAll()
        return res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = getProveedorHandler