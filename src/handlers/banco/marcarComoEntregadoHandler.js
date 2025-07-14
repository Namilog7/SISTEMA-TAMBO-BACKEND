const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const postResumen = require("../../controllers/resumen/postResumen");
const { conn, ChequeRecibido, Proveedor, Cheque } = require("../../db");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");

const marcarComoEntregadoHandler = async (req, res) => {
    const { id_cheque, tipo, id_prov, destino, detalle, id_sector } = req.body; //tipo = "PROVEEDOR" o "CASUAL" id_prov = id del proveedor o null, destino = nombre destinatario
    const transaction = await conn.transaction();
    try {
        let cheque;
        cheque = await ChequeRecibido.findOne({
            where: {
                id: id_cheque,
            },
            transaction,
        });
        if (!cheque) {
            cheque = await Cheque.findOne({
                where: {
                    id: id_cheque,
                },
                transaction,
            });
        }

        if (!cheque) throw new Error("No se encontro ese cheque");
        cheque.estado = "ENTREGADO";
        if (tipo == "PROVEEDOR") {
            const proveedor = await Proveedor.findOne({ where: { id: id_prov }, transaction });
            let metodosPago;
            if (!proveedor) throw new Error("No se encontro el proveedor");
            proveedor.saldo -= cheque.importe;
            cheque.destino = proveedor.nombre_empresa;
            await cheque.save({ transaction });
            metodosPago = {
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
                    fecha_pago: cheque.fecha_pago,
                },
            };
            await postResumen(
                {
                    id_afectado: id_prov,
                    nota_tipo,
                    fecha: new Date(),
                    detalle,
                    pago: true,
                    factura,
                    model: "PROVEEDOR",
                    importe: cheque.importe,
                },
                transaction
            );
            if (cheque instanceof Cheque || cheque instanceof ChequeRecibido) {
                const { nuevoGastoIngreso } = await postGastoIngreso(
                    { detalle, estado, tipo: "EGRESO", fecha: new Date(), id_sector },
                    transaction
                );
                await registrarMetodosPago(nuevoGastoIngreso.id, metodosPago, transaction);
            }
        }
        if (tipo == "CASUAL") {
            cheque.destino = destino;
            await cheque.save({ transaction });
            metodosPago = {
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
                    fecha_pago: cheque.fecha_pago,
                },
            };
        }
        res.json(metodosPago);
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error("Error al entregar cheque:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = marcarComoEntregadoHandler;
