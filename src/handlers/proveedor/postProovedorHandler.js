const crudController = require("../../controllers/crudController");
const { Proveedor, TamboProveedor } = require("../../db");

const postProveedorHandler = async (req, res) => {
    const postProveedor = crudController(Proveedor);
    const postProveedorTambo = crudController(TamboProveedor);

    const { nombre_empresa, contacto_1, contacto_2, localidad, saldo, isTamboProveedor, id_sector } = req.body
    try {
        let nuevoProveedor;
        if (isTamboProveedor) {
            nuevoProveedor = await postProveedorTambo.create({ nombre_empresa, contacto_1, contacto_2, localidad, saldo });
        }
        else {
            nuevoProveedor = await postProveedor.create({ nombre_empresa, contacto_1, contacto_2, localidad, saldo, id_sector })
        }
        return res.json({
            message: "Se creo el proovedor",
            nuevoProveedor
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = postProveedorHandler