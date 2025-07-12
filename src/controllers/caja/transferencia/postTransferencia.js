const { Transferencia, Cuenta } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario");

const postTransferencia = async (
    { fecha, importe, estado, detalle, tipo, id_origen, id_destino, nombre_origen, nombre_destino },
    transaction
) => {
    const nuevaTransferencia = await Transferencia.create(
        {
            fecha,
            importe,
            estado,
            detalle,
            tipo,
            id_origen,
            id_destino,
            nombre_origen,
            nombre_destino,
        },
        { transaction }
    );
    let registroCaja = {
        message: `Se agrego la transferencia con el estado PENDIENTE, cambie el estado cuando confirme el pago`,
    };
    // if (tipo === "CREDITO" || (tipo === "DEBITO" && estado == "ACEPTADA")) {
    //     registroCaja = await registrarSaldoBancario({ tipo, importe }, transaction);
    // }

    if (tipo === "CREDITO") {
        if (id_destino) {
            const cuentaDestino = await Cuenta.findByPk(id_destino, { transaction });
            if (cuentaDestino) {
                await cuentaDestino.increment("saldo", { by: importe, transaction });
                registroCaja = {
                    message: `Se registro un ingreso de $${importe} a la cuenta ${cuentaDestino.nombreCuenta}`,
                };
            } else {
                registroCaja = {
                    message: `No se encontró la cuenta destino con ID ${id_destino}`,
                };
            }
        }
    } else {
        if (id_origen) {
            const cuentaOrigen = await Cuenta.findByPk(id_origen, { transaction });
            if (cuentaOrigen) {
                await cuentaOrigen.decrement("saldo", { by: importe, transaction });
                registroCaja = {
                    message: `Se registro un egreso de $${importe} de la cuenta ${cuentaOrigen.nombreCuenta}`,
                };
            } else {
                registroCaja = {
                    message: `No se encontró la cuenta origen con ID ${id_origen}`,
                };
            }
        }
    }

    return {
        registroCaja,
        nuevaTransferencia,
    };
};

module.exports = postTransferencia;
