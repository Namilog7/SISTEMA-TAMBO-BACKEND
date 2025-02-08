const postProducto = require("../../controllers/fabrica/postProducto")


const postProductoHandler = async (req, res) => {
    const { id_sector, nombre, stock, ultimo_ingreso, precio_mayorista, precio_minorista, ultima_venta } = req.body
    try {
        const producto = await postProducto({ id_sector, nombre, stock, ultimo_ingreso, precio_mayorista, precio_minorista, ultima_venta })
        res.json({
            message: "Creado con exito",
            producto
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postProductoHandler