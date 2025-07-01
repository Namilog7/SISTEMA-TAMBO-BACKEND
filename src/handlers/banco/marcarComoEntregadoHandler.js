const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const { conn, ChequeRecibido, Proveedor } = require("../../db");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");

const marcarComoEntregadoHandler = async (req, res) => {
    const { id_cheque, tipo, id_prov, destino, detalle, estado, id_sector } = req.body; //tipo = "PROVEEDOR" o "CASUAL" id_prov = id del proveedor o null, destino = nombre destinatario
    const transaction = await conn.transaction();
    try {
        const cheque = await ChequeRecibido.findOne({
            where: { id: id_cheque },
            transaction
        });

        if (!cheque) throw new Error("No se encontro ese cheque");
        cheque.estado = "ENTREGADO";
        if (tipo == "PROVEEDOR") {
            const proveedor = await Proveedor.findOne({ where: { id: id_prov }, transaction });
            if (!proveedor) throw new Error("No se encontro el proveedor");
            proveedor.saldo -= cheque.importe;
            cheque.destino = proveedor.nombre;
            await cheque.save({ transaction });
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
            };
            const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo: "EGRESO", fecha: new Date(), id_sector }, transaction);
            await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction);
        }
        if (tipo == "CASUAL") {
            cheque.destino = destino;
            await cheque.save({ transaction });
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
            };
            const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo: "EGRESO", fecha: new Date(), id_sector }, transaction);
            await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction);
        }
        await transaction.commit();

        res.status(200).json({
            message: "Cheque entregado correctamente",
            cheque
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al entregar cheque:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = marcarComoEntregadoHandler;