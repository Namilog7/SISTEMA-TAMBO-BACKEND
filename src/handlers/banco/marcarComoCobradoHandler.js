const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const { ChequeRecibido, conn, Cuenta } = require("../../db");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");

const marcarComoCobrado = async (req, res) => {
    const { id, tipo_cobro, id_cuenta, detalle, estado, id_sector } = req.body;

    const transaction = await conn.transaction();
    try {
        const cheque = await ChequeRecibido.findOne({ where: { id }, transaction });

        if (!cheque) {
            await transaction.rollback();
            return res.status(404).json({ error: "Cheque no encontrado" });
        }

        cheque.estado = "COBRADO"
        await cheque.save({ transaction })

        if (tipo_cobro == "EFECTIVO") {
            let metodosPago = {
                metodo: "EFECTIVO",
                monto: cheque.importe
            }
            const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo: "INGRESO", fecha: new Date(), id_sector }, transaction);
            await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)
        }

        if (tipo_cobro == "DEPOSITO") {
            const cuenta = await Cuenta.findOne({ where: { id: id_cuenta }, transaction })
            cuenta.saldo += cheque.importe
            cuenta.save({ transaction })

            let metodosPago = {
                metodo: "CHEQUE",
                datosCheque: {
                    importe: cheque.importe,
                    estado: cheque.estado,
                    tipo: cheque.tipo,
                    detalle: cheque.detalle,
                    origen: cheque.origen,
                    destino: cheque.destino,
                    actual_destino: cheque.actual_destino,
                    banco: cheque.banco,
                    numero_cheque: cheque.numero_cheque,
                    fecha_emision: cheque.fecha_emision,
                    fecha_pago: cheque.fecha_pago
                }

            }
            const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo: "INGRESO", fecha: new Date(), id_sector }, transaction);
            await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)
        }
        await transaction.commit();

        res.status(200).json({
            message: "Cheque marcado como cobrado exitosamente",
            cheque
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al marcar como cobrado:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = marcarComoCobrado;
