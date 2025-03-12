const { SaldoCaja, CajaBancaria } = require("../../db");

const getCajaHandler = async (req, res) => {
    try {
        const caja = await SaldoCaja.findOne({});
        const cajaBancaria = await CajaBancaria.findOne({})
        if (!caja || !cajaBancaria) return res.json({ message: "No se registro ningun saldo" })
        res.json({
            caja,
            cajaBancaria
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports = getCajaHandler