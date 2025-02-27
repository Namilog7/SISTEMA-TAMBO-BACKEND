const { Proveedor } = require("../../db");

const deleteProveedorHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProveedor = await Proveedor.destroy({
            where: {
                id: id
            }
        })
        res.json({
            message: `Se eliminaron ${deleteProveedor} registros`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteProveedorHandler