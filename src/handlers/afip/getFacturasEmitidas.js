const { FacturaArca, ProductoFacturaArca, TributosFacturaArca } = require("../../db");

const getFacturasEmitidas = async (req, res) => {
    try {
        const { ultima_factura, tipo } = req.query;

        let opciones = {
            include: [
                { model: ProductoFacturaArca },
                { model: TributosFacturaArca }
            ],
            order: [['fecha_emision', 'DESC']]
        };

        if (ultima_factura === 'true' && tipo) {
            opciones.where = { tipoFactura: tipo };
            opciones.limit = 1; // Solo traer la más reciente

            const factura = await FacturaArca.findOne(opciones);

            if (!factura) {
                return res.status(404).json({
                    mensaje: `No se encontraron facturas del tipo ${tipo}`
                });
            }

            return res.status(200).json(factura);
        }

        const resultado = await FacturaArca.findAll(opciones);
        res.status(200).json(resultado);

    } catch (error) {
        console.error("Error al obtener facturas:", error.message);
        res.status(500).json({
            error: "Error interno del servidor",
            detalle: error.message
        });
    }
};

module.exports = getFacturasEmitidas;