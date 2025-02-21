const { Ingreso_recria } = require("../../db");

const getIngresoHandler = async (req, res) => {
    try {
        const ingreso_recria = await Ingreso_recria.findAll({
        });
        res.json(ingreso_recria)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = getIngresoHandler