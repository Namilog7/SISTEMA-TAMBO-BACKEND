const crudController = require("../../controllers/crudController");
const { Producto } = require("../../db");

const putProductoHandler = async (req, res) => {
    const { id, nombre, stock, ultimo_ingreso, precio_comercio, precio_reventa, precio_consumidor_final, ultima_venta, litro_variedad, masa_sin_elaborar } = req.body
    const putProducto = crudController(Producto);
    try {
        const producto = await putProducto.update({ id, nombre, stock, ultimo_ingreso, precio_comercio, precio_reventa, precio_consumidor_final, ultima_venta, litro_variedad, masa_sin_elaborar })
        res.json(producto)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.mesagge })
    }
}

module.exports = putProductoHandler