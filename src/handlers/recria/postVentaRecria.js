const { TransaccionGanado } = require("../../db");

const postVentaRecria = async (req, res) => {
    try {
        const { tipo_operacion, comprador, precio_kilo, monto_total, cantidad, fecha, genero } = req.body;

        // Validar que el tipo de operación sea VENTA
        if (tipo_operacion !== "VENTA") {
            return res.status(400).json({ message: "El tipo de operación debe ser VENTA." });
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
            genero
        });
        res.status(201).json({
            message: "Transacción de venta registrada con éxito.",
            transaccion,
        });
    } catch (error) {
        console.error("Error en postVentaRecria:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaRecria;
