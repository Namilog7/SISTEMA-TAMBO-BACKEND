const { Transferencia, Cuenta } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario");

const postTransferencia = async ({
    fecha,
    cuenta_origen,
    cuenta_destino,
    importe,
    detalle,
    estado,
    tipo,
    id_cuenta,
    id_cuenta_destino
}, transaction) => {

    const nuevaTransferencia = await Transferencia.create({
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle,
        estado,
        tipo,
        id_cuenta,
        id_cuenta_destino
    }, { transaction })
    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (tipo === "CREDITO" || tipo === "DEBITO" && estado == "ACEPTADA") {
        registroCaja = await registrarSaldoBancario({ tipo, importe }, transaction)
    }
    return {
        registroCaja,
        nuevaTransferencia
    }
}

module.exports = postTransferencia