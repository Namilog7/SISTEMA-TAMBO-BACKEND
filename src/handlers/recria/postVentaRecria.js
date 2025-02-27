const { TransaccionGanado, Macho, Movimiento_anotacion } = require("../../db");
const postCloudinary = require("../../controllers/postCloudinary")

const postVentaRecria = async (req, res) => {
    try {
        const { peso_total, contacto, tipo_operacion, comprador, precio_kilo, monto_total, cantidad, fecha, genero, comprobanteBase64 } = req.body;

        // Validar que el tipo de operación sea VENTA
        if (tipo_operacion !== "VENTA") {
            return res.status(400).json({ message: "El tipo de operación debe ser VENTA." });
        }
        if (!comprador || !precio_kilo || !monto_total || !cantidad || !fecha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        const comprobante = await postCloudinary(comprobanteBase64, "comprobantes")
        const transaccion = await TransaccionGanado.create({
            tipo_operacion,
            comprador,
            contacto,
            precio_kilo,
            monto_total,
            cantidad,
            fecha,
            genero,
            peso_total,
            comprobante,
        });
        if (genero === "MACHO") {
            const machos = await Macho.findOne()
            if (!machos) {
                throw new Error("Todavia no tienes machos")
            }
            machos.ternero_contador = machos.ternero_contador - cantidad
            await machos.save()
            await Movimiento_anotacion.create({
                texto: `Se vendieron ${cantidad} machos`,
                fecha: new Date()
            })
        }

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
