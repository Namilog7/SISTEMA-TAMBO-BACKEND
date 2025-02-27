const { Producto } = require("../../db");

const deleteProductoHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProducto = await Producto.destroy({
            where: {
                id: id
            }
        });
        res.json({
            message: `Se eliminaron ${deleteProducto}`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteProductoHandler