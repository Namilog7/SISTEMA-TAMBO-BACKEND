const { GastoIngreso } = require("../../db");

const getGastoIngresoHandler = async (req, res) => {
    const { id } = req.query
    try {
        const gastoIngreso = id ? await GastoIngreso.findByPk(id) : await GastoIngreso.findAll({})
        res.json(gastoIngreso)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getGastoIngresoHandler