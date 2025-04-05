const postProducto = require("../../controllers/fabrica/postProducto");
const { conn } = require("../../db");

const postProductoHandler = async (req, res) => {
    const { id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta, masa_sin_elaborar } = req.body
    const transaction = await conn.transaction()
    try {
        const producto = await postProducto({ id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta, masa_sin_elaborar }, transaction)
        if (producto.message == "Puede que el sector no exista") {
            return res.status(400).json({ message: "Manda el sector correcto corneta" })
        }
        await transaction.commit()
        res.json({
            message: "Creado con exito",
            producto
        })
    } catch (error) {
        await transaction.rollback()
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postProductoHandler