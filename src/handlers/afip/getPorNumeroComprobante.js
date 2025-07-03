const { FacturaArca, ProductoFacturaArca, TributosFacturaArca } = require("../../db");

const getFacturaPorNumero = async (req, res) => {
    const { numero } = req.params;

    try {
        const factura = await FacturaArca.findOne({
            where: { numero },
            include: [{ model: ProductoFacturaArca }, { model: TributosFacturaArca }],
        });

        if (!factura) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }

        res.status(200).json(factura);
    } catch (error) {
        console.error("Error al buscar la factura:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getFacturaPorNumero;
