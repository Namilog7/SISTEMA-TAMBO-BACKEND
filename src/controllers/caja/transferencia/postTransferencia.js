const { Transferencia } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario");

const postTransferencia = async ({
    fecha,
    cuenta_origen,
    cuenta_destino,
    importe,
    detalle,
    estado,
}) => {

    const nuevaTransferencia = await Transferencia.create({
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle,
        estado,
    })
    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (estado === "ACREDITADO" || estado === "CONFIRMADA" || estado === "COBRADO") {
        registroCaja = await registrarSaldoBancario({ estado, importe })
    }
    return {
        registroCaja,
        nuevaTransferencia
    }
}

module.exports = postTransferencia