const { ChequeRecibido } = require("../../db");
const crudController = require("../../controllers/crudController");

const getChequeRecibidoHandler = async (req, res) => {
    const getChequeRecibido = crudController(ChequeRecibido)
    try {
        const cheques = await getChequeRecibido.readAll()
        res.json(cheques)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getChequeRecibidoHandler