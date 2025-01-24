const { TransaccionGanado } = require("../../db");

const postCompraHandler = async (req, res) => {
    try {
        const { tipo_operacion, comprador, precio_kilo, monto_total, cantidad, fecha } = req.body;

        if (tipo_operacion !== "COMPRA") {
            return res.status(400).json({ message: "El tipo de operación debe ser COMPRA." });
        }

        if (!comprador || !precio_kilo || !monto_total || !cantidad || !fecha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        const transaccion = await TransaccionGanado.create({
            tipo_operacion,
            comprador,
            precio_kilo,
            monto_total,
            cantidad,
            fecha,
        });

        res.status(201).json({
            message: "Transacción de compra registrada con éxito.",
            transaccion,
        });
    } catch (error) {
        console.error("Error en postCompraHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postCompraHandler;
