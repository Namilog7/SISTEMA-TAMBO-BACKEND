const crudController = require("../../controllers/crudController");
const { PolizaSeguro } = require("../../db");

const putVencidaHandler = async (req, res) => {
    const { id } = req.query;

    const putPoliza = crudController(PolizaSeguro);

    try {
        const update = await putPoliza.update({
            id,
            estado: "VENCIDA",
        });

        res.json(update);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putVencidaHandler;
