const { GastoIngreso } = require("../../db");

const getGastoIngresoHandler = async (req, res) => {
    const { id } = req.params
    try {
        const gastoIngreso = await GastoIngreso.findAll({
            where: {
                id: id
            }
        })
        res.json(gastoIngreso)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getGastoIngresoHandler