const crudController = require("../../controllers/crudController");
const { ClienteLeche } = require("../../db");

const getClienteLecheHandler = async (req, res) => {
    const getClienteLeche = crudController(ClienteLeche)
    try {
        const response = await getClienteLeche.readAll()
        return res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getClienteLecheHandler