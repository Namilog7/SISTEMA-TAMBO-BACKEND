const crudController = require("../../controllers/crudController");
const { Proveedor, TamboProveedor } = require("../../db");

const putProovedorHandler = async (req, res) => {
    const putProveedor = crudController(Proveedor);
    const putTamboProveedor = crudController(TamboProveedor);

    const { id, nombre, contacto_1, contacto_2, localidad, isTamboProveedor } = req.body
    try {
        let proveedor;
        if (isTamboProveedor) {
            proveedor = await putTamboProveedor.update({ id, nombre, contacto_1, contacto_2, localidad, saldo })
        }
        else {
            proveedor = await putProveedor.update({ id, nombre, contacto_1, contacto_2, localidad, saldo })
        }
        return res.json({
            message: "Se actualizo el proovedor",
            proveedor
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = putProovedorHandler