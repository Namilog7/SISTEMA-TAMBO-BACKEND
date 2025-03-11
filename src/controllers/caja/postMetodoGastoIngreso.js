const { GastoIngreso, MetodoGastoIngreso, SaldoCaja } = require("../../db");

const postMetodoGastoIngreso = async ({ id_gasto_ingreso, metodo, monto }, transaction) => {
    try {
        if (!id_gasto_ingreso || !metodo || monto === undefined) {
            throw new Error("Faltan datos obligatorios");
        }

        const importeNum = Number(monto);
        if (isNaN(importeNum) || importeNum <= 0) {
            throw new Error("El importe debe ser un número válido y mayor a 0");
        }

        const gastoIngreso = await GastoIngreso.findByPk(id_gasto_ingreso);
        if (!gastoIngreso) {
            throw new Error("El gasto/ingreso no existe");
        }

        const nuevoMetodo = await MetodoGastoIngreso.create({
            id_gasto_ingreso,
            metodo,
            monto: importeNum,
        }, { transaction });

        let saldoActualizado = null;

        if (metodo === "EFECTIVO") {
            let saldoCaja = await SaldoCaja.findOne({ transaction });
            if (!saldoCaja) {
                saldoCaja = await SaldoCaja.create({ saldo: 0 }, { transaction });
            }

            if (gastoIngreso.tipo === "INGRESO") {
                saldoCaja.saldo += importeNum;
            } else if (gastoIngreso.tipo === "EGRESO") {
                saldoCaja.saldo -= importeNum;
            }

            await saldoCaja.save({ transaction });
            saldoActualizado = saldoCaja.saldo;
        }

        return {
            metodoGastoIngreso: nuevoMetodo,
            saldoActualizado: saldoActualizado !== null ? saldoActualizado : "No aplica",
        };

    } catch (error) {
        console.error("Error en registrarMetodoPago:", error);
        throw error;
    }
};

module.exports = postMetodoGastoIngreso;
