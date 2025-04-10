const crudController = require("../../controllers/crudController");
const { Proveedor, TamboProveedor } = require("../../db");

const getProveedorHandler = async (req, res) => {
    const getProveedor = crudController(Proveedor);
    const getTamboProveedor = crudController(TamboProveedor)
    const { id_sector } = req.query;
    try {
        if (id_sector) {
            const proveedoresSector = await Proveedor.findAll({
                where: {
                    id_sector
                }
            })
            return res.json(proveedoresSector)
        }
        const proveedor = await getProveedor.readAll()
        const tamboProveedor = await getTamboProveedor.readAll()
        return res.json({
            proveedor,
            tamboProveedor
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = getProveedorHandler