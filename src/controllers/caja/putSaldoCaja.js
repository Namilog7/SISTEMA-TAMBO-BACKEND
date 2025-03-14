const { SaldoCaja } = require("../../db");

const putSaldoCaja = async ({ metodo, gastoIngreso, importe }, transaction) => {
    if (metodo !== "EFECTIVO") return;

    let saldoCaja = await SaldoCaja.findOne({ transaction });

    if (!saldoCaja) {
        saldoCaja = await SaldoCaja.create({ saldo: 0 }, { transaction });
    }

    console.log("Saldo antes de la actualización:", saldoCaja.saldo);

    if (gastoIngreso.tipo === "INGRESO") {
        saldoCaja.saldo += Number(importe);
    } else if (gastoIngreso.tipo === "EGRESO") {
        saldoCaja.saldo -= Number(importe);
    }

    console.log("Saldo después de la actualización:", saldoCaja.saldo);

    await saldoCaja.save({ transaction });
};

module.exports = putSaldoCaja;
