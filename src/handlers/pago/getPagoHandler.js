const { Pago } = require("../../db");

const getPagoHandler = async (req, res) => {
    const { id } = req.params
    try {
        const pagos = await Pago.findAll({
            where: {
                id: id
            }
        });
        res.json({
            pagos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getPagoHandler