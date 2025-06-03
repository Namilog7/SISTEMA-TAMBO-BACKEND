const putSaldoCaja = require("../../controllers/caja/putSaldoCaja");
const { GastoIngreso, MetodoGastoIngreso, conn } = require("../../db");
const registrarSaldoBancario = require("../../helpers/registrarSaldoBancario");


const anularGastoIngresoHandler = async (req, res) => {
    const { id } = req.query;

    const transaction = await conn.transaction();
    try {
        const gastoIngreso = await GastoIngreso.findOne({
            where: { id },
            include: MetodoGastoIngreso,
            transaction
        });

        if (!gastoIngreso) {
            await transaction.rollback();
            return res.status(404).json({ error: "Gasto/Ingreso no encontrado" });
        }

        // Recorremos los métodos de pago para revertir los saldos
        for (const metodo of gastoIngreso.MetodoGastoIngresos) {
            const { metodo: tipoMetodo, importe } = metodo;

            if (tipoMetodo === "EFECTIVO") {
                // Revertimos desde SaldoCaja
                await putSaldoCaja({ metodo: "EFECTIVO", gastoIngreso: "EGRESO", importe }, transaction);
            } else if (tipoMetodo === "CHEQUE" || tipoMetodo === "TRANSFERENCIA") {
                // Revertimos desde CajaBancaria
                await registrarSaldoBancario({ estado: "ANULADO", importe }, transaction);
            }
        }

        gastoIngreso.estado = "ANULADO";
        await gastoIngreso.save({ transaction });

        await transaction.commit();
        res.status(200).json({ message: "Gasto/Ingreso anulado con éxito" });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al anular GastoIngreso:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = anularGastoIngresoHandler;
