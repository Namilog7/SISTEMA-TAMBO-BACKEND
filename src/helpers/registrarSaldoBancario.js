const { CajaBancaria } = require("../db");

const registrarSaldoBancario = async ({ estado, importe }, transaction) => {
    try {
        let cajaBancaria = await CajaBancaria.findOne({ transaction });

        if (!cajaBancaria) {
            cajaBancaria = await CajaBancaria.create({ saldo: 0 }, { transaction });
        }

        if (estado === "COBRADO" || estado === "ACEPTADA") {
            cajaBancaria.saldo += Number(importe);
        }
        if (estado === "PAGADO" || estado === "ANULADO") {
            cajaBancaria.saldo -= Number(importe);
        }

        await cajaBancaria.save({ transaction });

        return {
            message: `Se actualizó el saldo de la Caja Bancaria`,
            nuevoSaldo: cajaBancaria.saldo
        };
    } catch (error) {
        console.error("Error en registrarSaldoBancario:", error);
        throw error; // Para que el rollback del handler principal se active
    }
};

module.exports = registrarSaldoBancario