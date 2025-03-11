const { TransaccionGanado, Macho, Movimiento_anotacion, conn } = require("../../db");
const postCloudinary = require("../../controllers/postCloudinary")
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago")

const postVentaRecria = async (req, res) => {
    const transaction = await conn.transaction()
    try {
        const { peso_total, contacto, tipo_operacion, comprador, precio_kilo, monto, cantidad, fecha, genero, comprobanteBase64, tipo = "INGRESO", id_sector, metodosPago, detalle = "", estado = "ACEPTADO" } = req.body;

        // Validar que el tipo de operación sea VENTA
        if (tipo_operacion !== "VENTA") {
            return res.status(400).json({ message: "El tipo de operación debe ser VENTA." });
        }
        if (!comprador || !precio_kilo || !monto || !cantidad || !fecha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        let comprobante
        if (comprobanteBase64) {
            comprobante = await postCloudinary(comprobanteBase64, "comprobantes")
        }
        const transaccion = await TransaccionGanado.create({
            tipo_operacion,
            comprador,
            contacto,
            precio_kilo,
            monto,
            cantidad,
            fecha,
            genero,
            peso_total,
            comprobante,
        }, { transaction });
        if (genero === "MACHO") {
            const machos = await Macho.findOne({ transaction })
            if (!machos) {
                throw new Error("Todavia no tienes machos")
            }
            if (cantidad > machos.ternero_contador) throw new Error("La cantidad no puede ser mayor a lo que que hay actualmente")
            machos.ternero_contador = machos.ternero_contador - cantidad
            await machos.save({ transaction })
            await Movimiento_anotacion.create({
                texto: `Se vendieron ${cantidad} machos`,
                fecha: new Date(),
                archivo: comprobante,
                terneros_afectados: cantidad,
                tipo_movimiento: tipo_operacion
            })
        }
        const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector, transaction });
        let allMetodos = await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)

        res.status(201).json({
            message: "Transacción de venta registrada con éxito.",
            transaccion,
            newGastoIngreso,
            allMetodos
        });
    } catch (error) {
        await transaction.rollback()
        console.error("Error en postVentaRecria:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaRecria;
