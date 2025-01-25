const { TransaccionGanado } = require("../../db");

const getCompraHandler = async (req, res) => {
    try {
        const compraGanado = TransaccionGanado.findAll({
            where: {
                tipo_operacion: "COMPRA"
            }
        });
        res.json(compraGanado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = getCompraHandler