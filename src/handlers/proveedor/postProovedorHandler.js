const crudController = require("../../controllers/crudController");
const { Proveedor, TamboProveedor } = require("../../db");

const postProveedorHandler = async (req, res) => {
    const postProveedor = crudController(Proveedor);
    const postProveedorTambo = crudController(TamboProveedor);

    const { nombre, contacto_1, contacto_2, localidad, saldo, isProveedorTambo } = req.body
    try {
        let nuevoProveedor;
        if (isProveedorTambo) {
            nuevoProveedor = await postProveedorTambo.create({ nombre, contacto_1, contacto_2, localidad, saldo });
        }
        else {
            nuevoProveedor = await postProveedor.create({ nombre, contacto_1, contacto_2, localidad, saldo })
        }
        return res.json({
            message: "Se creo el proovedor",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = postProveedorHandler