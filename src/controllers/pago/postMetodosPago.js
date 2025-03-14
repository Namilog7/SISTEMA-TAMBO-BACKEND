const { MetodoPago } = require("../../db");
const postPago = require("../../controllers/pago/postPago");
const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");
const postCheque = require("../../controllers/caja/cheque/postCheque");
const postResumen = require("../../controllers/resumen/postResumen");

const postMetodosPago = async ({ metodos, fecha, id_cliente, id_proveedor, detalle = "" }, transaction) => {
    // datosTransferencia: fecha,cuenta_origen,cuenta_destino,importe, detalle, estado
    // datosCheque: importe,estado,tipo,detalle,origen, destino, actual_destino,banco,numero_cheque,fecha_emision,fecha_pago,fecha_cobro
    if (metodos.length == 0 || !id_pago) throw new Error("No mandaste bien las cosas corneta")
    const nuevoPago = await postPago({ detalle, fecha, id_cliente, id_proveedor }, transaction)
    let totalMetodos = [];
    let resultado = {};
    let pagosUsados = []
    for (const metodo of metodos) {
        let metodoRegistrado = await MetodoPago.create({
            id_pago: nuevoPago.id,
            detalle: metodo.detalle,
            fecha: metodo.fecha,
            id_cliente: metodo.id_cliente,
            id_proveedor: metodo.id_proveedor,
            importe: metodo.importe,
            metodo: metodo.metodo
        })
        totalMetodos.push(metodoRegistrado)
        pagos.push(metodo.metodo)

        if (metodo.metodo === "TRANSFERENCIA" && metodo.datosTransferencia) {
            resultado.transferencia = await postTransferencia(metodo.datosTransferencia, transaction);
        }
        if (metodo.metodo === "CHEQUE" && metodo.datosCheque) {
            resultado.cheque = await postCheque(metodo.datosCheque, transaction);
        }
    }
    const pagos = pagosUsados.join(",")
    const id_afectado = id_cliente ? id_cliente : id_proveedor
    /*  const nuevoResumen = await postResumen({id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe}) */
    return {
        totalMetodos,
        resultado
    }
}
module.exports = postMetodosPago