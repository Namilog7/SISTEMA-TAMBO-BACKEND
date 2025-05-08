const { Cheque } = require("../../../db");
const registrarSaldoBancario = require("../../../helpers/registrarSaldoBancario")

const postCheque = async ({
    importe,
    estado,
    detalle,
    destino,
    banco,
    numero_cheque,
    fecha_emision,
    fecha_pago
}, transaction) => {

    const nuevoCheque = await Cheque.create({
        importe,
        estado,
        detalle,
        destino,
        banco,
        numero_cheque,
        fecha_emision,
        fecha_pago
    }, { transaction })

    let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
    if (estado === "PAGADO") {
        registroCaja = await registrarSaldoBancario({ estado, importe }, transaction)
    }
    return {
        registroCaja,
        nuevoCheque
    }


}
module.exports = postCheque