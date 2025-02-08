const { TransaccionGanado } = require("../../db");
const getVentaHandler = async (req, res) => {
    try {
        const ventasGanado = await TransaccionGanado.findAll({
            where: {
                tipo_operacion: "VENTA"
            }
        });
        res.json(ventasGanado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getVentaHandler