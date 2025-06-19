const crudController = require("../../controllers/crudController");
const { Transferencia } = require("../../db");

const getTransferenciaHandler = async (req, res) => {
    const transferencias = crudController(Transferencia)
    try {
        const allTransferencias = await transferencias.readAll();
        res.json(allTransferencias)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getTransferenciaHandler