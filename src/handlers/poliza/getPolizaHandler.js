const { PolizaSeguro } = require("../../db");
const crudController = require("../../controllers/crudController")

const getPolizaHandler = async (req, res) => {
    const getPoliza = crudController(PolizaSeguro);
    try {
        const polizas = await getPoliza.readAll();
        res.json(polizas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getPolizaHandler