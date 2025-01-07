const crudController = require("../../controllers/crudController");
const { Cliente } = require("../../db");

const getClienteHandler = async (req, res) => {
    const getCliente = crudController(Cliente)
    try {
        const response = await getCliente.readAll()
        return res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getClienteHandler