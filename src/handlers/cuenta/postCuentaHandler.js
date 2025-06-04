const { Cuenta, conn } = require("../../db");
const crudController = require("../../controllers/crudController");

const postCuentaHandler = async (req, res) => {
    const { nombre_cuenta, alias_cbu, saldo } = req.body
    const transaction = await conn.transaction()
    const createCuenta = crudController(Cuenta)
    try {
        const cuenta = await createCuenta.create({ nombre_cuenta, alias_cbu, saldo }, { transaction })
        await transaction.commit()
        res.json(cuenta)
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postCuentaHandler