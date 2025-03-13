const { Transferencia } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario");

const postTransferencia = async ({
    fecha,
    cuenta_origen,
    cuenta_destino,
    importe,
    detalle,
    estado,
}, transaction) => {

    const nuevaTransferencia = await Transferencia.create({
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle,
        estado,
    }, { transaction })
    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (estado === "ACREDITADO" || estado === "CONFIRMADA" || estado === "COBRADO") {
        registroCaja = await registrarSaldoBancario({ estado, importe }, transaction)
    }
    return {
        registroCaja,
        nuevaTransferencia
    }
}

module.exports = postTransferencia