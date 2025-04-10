const { Cuenta } = require("../../db");
const crudController = require("../../controllers/crudController");

const postCuentaHandler = async (req, res) => {
    const { nombre_cuenta, alias_cbu, saldo } = req.body
    const createCuenta = crudController(Cuenta)
    try {
        const cuenta = await createCuenta.create({ nombre_cuenta, alias_cbu, saldo })
        res.json(cuenta)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postCuentaHandler