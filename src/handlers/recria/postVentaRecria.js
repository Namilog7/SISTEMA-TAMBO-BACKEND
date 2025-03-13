const { Macho, Movimiento_anotacion, conn } = require("../../db");
const postCloudinary = require("../../controllers/postCloudinary")
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");


const postVentaRecria = async (req, res) => {
    // peso_total, contacto, tipo_operacion, comprador, precio_kilo, monto, cantidad, fecha, genero,
    const { peso_total, contacto, tipo_operacion, comprador, precio_kilo, monto, cantidad, fecha, genero, comprobanteBase64, tipo = "INGRESO", id_sector, metodosPago, detalle = "", estado = "ACEPTADO" } = req.body;
    const transaction = await conn.transaction()
    try {

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
        /* const transaccion = await TransaccionGanado.create({
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
        }, { transaction }); */
        let machos = await Macho.findOne({ transaction })
        if (genero === "MACHO") {
            if (!machos) {
                machos = Macho.create({
                    ternero_contador: 0
                }, { transaction })
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
            }, { transaction })
        }
        const { nuevoGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector }, transaction);
        const id_gasto_ingreso = nuevoGastoIngreso.id
        let allMetodos = await registrarMetodosPago(id_gasto_ingreso, metodosPago, transaction)

        await transaction.commit();
        return res.status(201).json({
            message: "Venta realizada con éxito.",
            nuevoGastoIngreso,
            allMetodos
        });
    } catch (error) {
        await transaction.rollback()
        console.error("Error en postVentaRecria:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaRecria;
