const putSaldoCaja = require("../../controllers/caja/putSaldoCaja");
const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");
const { ChequeRecibido, conn } = require("../../db");

const marcarComoCobrado = async (req, res) => {
    const { id, efectivo, id_cuenta } = req.body;

    const transaction = await conn.transaction();
    try {
        const cheque = await ChequeRecibido.findOne({ where: { id }, transaction });

        if (!cheque) {
            await transaction.rollback();
            return res.status(404).json({ error: "Cheque no encontrado" });
        }

        if (efectivo) {
            await putSaldoCaja(
                {
                    metodo: "EFECTIVO",
                    gastoIngreso: "INGRESO",
                    importe: cheque.importe,
                },
                transaction
            );
        }

        let transferencia = null;
        if (id_cuenta) {
            transferencia = await postTransferencia(
                {
                    fecha: new Date(),
                    importe: cheque.importe,
                    tipo: "INTERNO",
                    id_cuenta_destino: id_cuenta,
                },
                transaction
            );
        }

        await transaction.commit();

        res.status(200).json({
            message: "Cheque marcado como cobrado exitosamente",
            cheque,
            ...(transferencia && { transferencia }),
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al marcar como cobrado:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = marcarComoCobrado;
