const { CajaBancaria } = require("../db");

const registrarSaldoBancario = async ({ estado, importe }, transaction) => {
    let cajaBancaria
    cajaBancaria = await CajaBancaria.findOne({ transaction })
    if (!cajaBancaria) {
        cajaBancaria = await CajaBancaria.create({
            saldo: 0
        }, { transaction })
    }
    if (estado === "ACREDITADO") {
        cajaBancaria.saldo += importe
    }
    if (estado === "CONFIRMADA" || estado === "COBRADO") {
        cajaBancaria.saldo -= importe
    }
    await cajaBancaria.save({ transaction })
    return {
        message: `Se actualizo el saldo de la Caja Bancaria`,
        nuevoSaldo: cajaBancaria.saldo
    }
}

module.exports = registrarSaldoBancario