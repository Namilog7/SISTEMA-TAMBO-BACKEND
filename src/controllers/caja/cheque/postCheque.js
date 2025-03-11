const { Cheque } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario")

const postCheque = async ({
    importe,
    estado,
    tipo,
    detalle,
    origen,
    destino,
    actual_destino,
    banco,
    numero_cheque,
    fecha_emision,
    fecha_pago,
    fecha_cobro
}) => {

    const nuevoCheque = await Cheque.create({
        importe,
        estado,
        tipo,
        detalle,
        origen,
        destino,
        actual_destino,
        banco,
        numero_cheque,
        fecha_emision,
        fecha_pago,
        fecha_cobro
    })

    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (estado === "ACREDITADO" || estado === "CONFIRMADA" || estado === "COBRADO") {
        registroCaja = await registrarSaldoBancario({ estado, importe })
    }
    return {
        registroCaja,
        nuevoCheque
    }


}
module.exports = postCheque