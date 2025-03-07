const { SaldoCaja } = require("../../db");

const getCajaHandler = async (req, res) => {
    try {
        const response = await SaldoCaja.findOne({})
        if (!response) return res.json({ message: "No se registro ningun saldo" })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports = getCajaHandler