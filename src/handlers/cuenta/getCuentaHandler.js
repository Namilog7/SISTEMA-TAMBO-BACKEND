const crudController = require("../../controllers/crudController");
const { Cuenta } = require("../../db");

const getCuentaHandler = async (req, res) => {
    const getCuentas = crudController(Cuenta)
    try {
        const cuentas = await getCuentas.readAll();
        res.json(cuentas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCuentaHandler