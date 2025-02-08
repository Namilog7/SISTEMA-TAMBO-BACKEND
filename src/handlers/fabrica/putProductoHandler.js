const crudController = require("../../controllers/crudController");
const { Producto } = require("../../db");

const putProductoHandler = async (req, res) => {
    const { id, nombre, stock, ultimo_ingreso, precio_mayorista, precio_minorista, ultima_venta } = req.body
    const putProducto = crudController(Producto);
    try {
        const producto = await putProducto.update({ id, nombre, stock, ultimo_ingreso, precio_mayorista, precio_minorista, ultima_venta })
        res.json(producto)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.mesagge })
    }
}

module.exports = putProductoHandler