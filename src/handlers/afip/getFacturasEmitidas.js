const { FacturaArca, ProductoFacturaArca, TributosFacturaArca } = require("../../db");

const getFacturasEmitidas = async (req, res) => {
    try {
        const resultado = await FacturaArca.findAll({
            include: [
                {
                    model: ProductoFacturaArca,
                },
                {
                    model: TributosFacturaArca,
                },
            ],
        });

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al traer todas las facturas cargadas:", error.message);

        res.status(500).json({ error: error.message });
    }
};

module.exports = getFacturasEmitidas;
