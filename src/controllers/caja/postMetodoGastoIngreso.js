const { GastoIngreso, MetodoGastoIngreso, SaldoCaja } = require("../../db");

const postMetodoGastoIngreso = async ({ id_gasto_ingreso, metodo, monto }, transaction) => {
    if (!id_gasto_ingreso || !metodo || monto === undefined) {
        throw new Error("Faltan datos obligatorios");
    }

    const importeNum = Number(monto);
    if (isNaN(importeNum) || importeNum <= 0) {
        throw new Error("El importe debe ser un número válido y mayor a 0");
    }

    const id = id_gasto_ingreso.replace(/"/g, "");
    const gastoIngreso = await GastoIngreso.findByPk(id, { transaction });
    if (!gastoIngreso) {
        throw new Error("El gasto/ingreso no existe");
    }

    const nuevoMetodo = await MetodoGastoIngreso.create({
        id_gasto_ingreso,
        metodo,
        monto: importeNum,
    }, { transaction });

    let saldoCaja;

    if (metodo === "EFECTIVO") {
        saldoCaja = await SaldoCaja.findOne({ transaction });
        if (!saldoCaja) {
            saldoCaja = await SaldoCaja.create({ saldo: 0 }, { transaction });
        }
        console.log("Saldo antes de la actualización:", saldoCaja.saldo);
        if (gastoIngreso.tipo === "INGRESO") {
            saldoCaja.saldo += importeNum;
        } else if (gastoIngreso.tipo === "EGRESO") {
            saldoCaja.saldo -= importeNum;
        }

        console.log("Saldo después de la actualización:", saldoCaja.saldo);

        await saldoCaja.save({ transaction });
    }
    return nuevoMetodo

};

module.exports = postMetodoGastoIngreso;
