const crudController = require("../../controllers/crudController");
const { Cliente } = require("../../db");

const putClienteHandler = async (req, res) => {
    const putClienteLeche = crudController(Cliente);
    const { nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_sector, numero_cuenta, saldo } = req.body

    try {
        const response = await putClienteLeche({ nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_sector, numero_cuenta, saldo });
        return res.json({
            message: "Datos actualizados",
            response
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = putClienteHandler