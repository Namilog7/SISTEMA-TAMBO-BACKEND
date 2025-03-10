const postProducto = require("../../controllers/fabrica/postProducto")


const postProductoHandler = async (req, res) => {
    const { id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta } = req.body
    try {
        const producto = await postProducto({ id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta })
        res.json({
            message: "Creado con exito",
            producto
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postProductoHandler