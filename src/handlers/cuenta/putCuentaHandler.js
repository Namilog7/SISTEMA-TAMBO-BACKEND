const crudController = require("../../controllers/crudController");
const { Cuenta } = require("../../db");

const putCuentaHandler = async (req, res) => {
    const { nombre_cuenta, alias_cbu, saldo, id } = req.body
    const updateCuenta = crudController(Cuenta);

    try {
        await updateCuenta.update({ nombre_cuenta, alias_cbu, saldo, id });
        res.json({ message: "Se actualizo el registro" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = putCuentaHandler