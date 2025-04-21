const { Proveedor, TamboProveedor } = require("../../db");


const getProveedorByIdHandler = async (req, res) => {
    const { id } = req.params
    try {
        const proveedor = await Proveedor.findOne({
            where: { id }
        });
        let tamboProveedor;
        if (!proveedor) {
            tamboProveedor = await TamboProveedor.findOne({
                where: { id }
            })
        }
        res.json({
            proveedor,
            tamboProveedor
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getProveedorByIdHandler