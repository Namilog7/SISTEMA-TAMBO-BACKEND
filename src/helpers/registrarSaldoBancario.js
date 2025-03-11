const { CajaBancaria } = require("../db");

const registrarSaldoBancario = async ({ estado, importe }) => {
    const cajaBancaria = await CajaBancaria.findOne({})
    if (estado === "ACREDITADO") {
        cajaBancaria.saldo += importe
    }
    if (estado === "CONFIRMADA" || estado === "COBRADO") {
        cajaBancaria.saldo -= importe
    }
    cajaBancaria.save()
    return {
        message: `Se actualizo el saldo de la Caja Bancaria`,
        nuevoSaldo: cajaBancaria.saldo
    }
}

module.exports = registrarSaldoBancario