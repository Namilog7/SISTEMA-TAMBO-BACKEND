const { PolizaSeguro } = require("../../db");
const crudController = require("../../controllers/crudController");

const deletePolizaHandler = async (req, res) => {
    const { id } = req.params;
    const deletePoliza = crudController(PolizaSeguro);
    try {
        const poliza = deletePoliza.delete(id);
        res.json(poliza)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deletePolizaHandler