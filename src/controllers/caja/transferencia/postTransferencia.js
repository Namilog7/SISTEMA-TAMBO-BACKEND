const { Transferencia } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario");

const postTransferencia = async ({
    fecha,
    cuenta_origen,
    cuenta_destino,
    importe,
    detalle,
    estado,
    tipo,
}, transaction) => {

    const nuevaTransferencia = await Transferencia.create({
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle,
        estado,
        tipo
    }, { transaction })
    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (tipo === "CREDITO" || tipo === "DEBITO") {
        registroCaja = await registrarSaldoBancario({ tipo, importe }, transaction)
    }
    return {
        registroCaja,
        nuevaTransferencia
    }
}

module.exports = postTransferencia