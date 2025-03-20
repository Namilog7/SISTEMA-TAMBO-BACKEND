const { Pago } = require("../../db");

const getPagosHandler = async (req, res) => {
    try {
        const allPagos = await Pago.findAll({})
        res.json(allPagos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = getPagosHandler