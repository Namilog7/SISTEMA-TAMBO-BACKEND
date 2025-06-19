const crudController = require("../../controllers/crudController");
const { Cheque } = require("../../db");

const getChequeHandler = async (req, res) => {
    const cheque = crudController(Cheque)
    try {
        const allCheques = await cheque.readAll()
        res.json(allCheques)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getChequeHandler