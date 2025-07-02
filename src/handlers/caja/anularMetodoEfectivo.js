const putSaldoCaja = require("../../controllers/caja/putSaldoCaja");
const { MetodoGastoIngreso, conn } = require("../../db");

const anularMetodoEfectivo = async (req, res) => {
    const { id } = req.query;

    const transaction = await conn.transaction();
    try {
        const metodo = await MetodoGastoIngreso.findOne({
            where: { id },
            transaction
        });

        if (!metodo) {
            await transaction.rollback();
            return res.status(404).json({ error: "Método de gasto/ingreso no encontrado" });
        }

        if (metodo.metodo !== "EFECTIVO") {
            await transaction.rollback();
            return res.status(400).json({ error: "El método no es EFECTIVO" });
        }

        if (metodo.estado === "ANULADO") {
            await transaction.rollback();
            return res.status(400).json({ error: "El método ya está anulado" });
        }

        metodo.estado = "ANULADO";
        await metodo.save({ transaction });

        await putSaldoCaja({ gastoIngreso: "EGRESO", metodo: "EFECTIVO", importe: metodo.monto }, transaction);

        await transaction.commit();
        res.status(200).json({ message: "Método efectivo anulado y saldo actualizado" });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = anularMetodoEfectivo;
