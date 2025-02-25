const { Recria } = require("../../db");

const getIngresoHandler = async (req, res) => {
    try {
        const ingreso_recria = await Recria.findAll({});
        res.json(ingreso_recria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = getIngresoHandler;
