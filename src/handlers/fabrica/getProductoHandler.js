const crudController = require("../../controllers/crudController");
const { Producto } = require("../../db")
const getProductoHandler = async (req, res) => {
    try {
        const getProducto = crudController(Producto);
        const producto = await getProducto.readAll()
        res.json(producto)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getProductoHandler