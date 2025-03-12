const postCheque = require("../controllers/caja/cheque/postCheque");
const postTransferencia = require("../controllers/caja/transferencia/postTransferencia");
const postMetodoGastoIngreso = require("../controllers/caja/postMetodoGastoIngreso");
/**
 * Registra múltiples métodos de pago y, si el método es TRANSFERENCIA o CHEQUE, 
 * ejecuta las funciones correspondientes para almacenar la información adicional.
 * 
 * @param {number} id_gasto_ingreso - ID del gasto o ingreso asociado al método de pago.
 * @param {Array<Object>} metodosPago - Lista de métodos de pago a registrar.
 * @param {string} metodosPago[].metodo - Tipo de método de pago (Ejemplo: "EFECTIVO", "TRANSFERENCIA", "CHEQUE").
 * @param {number} metodosPago[].monto - Monto asociado al método de pago.
 * @param {Object} [metodosPago[].datosTransferencia] - Datos adicionales si el método es "TRANSFERENCIA".
 * @param {string} metodosPago[].datosTransferencia.fecha - Fecha de la transferencia.
 * @param {string} metodosPago[].datosTransferencia.cuenta_origen - Cuenta de origen de la transferencia.
 * @param {string} metodosPago[].datosTransferencia.cuenta_destino - Cuenta de destino de la transferencia.
 * @param {number} metodosPago[].datosTransferencia.importe - Monto de la transferencia.
 * @param {string} metodosPago[].datosTransferencia.detalle - Detalle de la transferencia.
 * @param {string} metodosPago[].datosTransferencia.estado - Estado de la transferencia.
 * @param {Object} [metodosPago[].datosCheque] - Datos adicionales si el método es "CHEQUE".
 * @param {number} metodosPago[].datosCheque.importe - Monto del cheque.
 * @param {string} metodosPago[].datosCheque.estado - Estado del cheque.
 * @param {string} metodosPago[].datosCheque.tipo - Tipo de cheque (Ejemplo: "TERCERO", "RECIBIDO","ENTREGADO").
 * @param {string} metodosPago[].datosCheque.detalle - Detalle del cheque.
 * @param {string} metodosPago[].datosCheque.origen - Origen del cheque.
 * @param {string} metodosPago[].datosCheque.destino - Destino inicial del cheque.
 * @param {string} metodosPago[].datosCheque.actual_destino - Destino actual del cheque.
 * @param {string} metodosPago[].datosCheque.banco - Banco emisor del cheque.
 * @param {string} metodosPago[].datosCheque.numero_cheque - Número del cheque.
 * @param {string} metodosPago[].datosCheque.fecha_emision - Fecha de emisión del cheque.
 * @param {string} metodosPago[].datosCheque.fecha_pago - Fecha de pago del cheque.
 * @param {string} metodosPago[].datosCheque.fecha_cobro - Fecha de cobro del cheque.
 * @param {Object} [transaction] - Instancia de Sequelize para asegurar que todo el bloque se complete o sino se revierta.
 * 
 * @returns {Promise<Array<Object>>} - Lista de los métodos de pago registrados.
 * 
 * @throws {Error} - Lanza un error si ocurre un problema al registrar los métodos de pago.
 */
const registrarMetodosPago = async (id_gasto_ingreso, metodosPago, transaction) => {
    if (!Array.isArray(metodosPago) || metodosPago.length === 0) {
        return [];
    }
    let transferencia;
    let cheque;
    let metodos = []
    const metodosRegistrados = await Promise.all(
        metodosPago.map(async (metodo) => {

            let metodoRegistrado = await postMetodoGastoIngreso({
                id_gasto_ingreso,
                metodo: metodo.metodo,
                monto: metodo.monto
            }, transaction);
            metodos.push(metodoRegistrado)
            // Si es transferencia o cheque, ejecutar las funciones correspondientes
            if (metodo.metodo === "TRANSFERENCIA") {
                const {
                    fecha,
                    cuenta_origen,
                    cuenta_destino,
                    importe,
                    detalle,
                    estado,
                } = metodo.datosTransferencia;
                transferencia = await postTransferencia({
                    fecha,
                    cuenta_origen,
                    cuenta_destino,
                    importe,
                    detalle,
                    estado,
                }, transaction);
            }

            if (metodo.metodo === "CHEQUE") {
                const {
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
                } = metodo.datosCheque;
                cheque = await postCheque({
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
                }, transaction);
            }

            return {
                metodoRegistrado,
                transferencia,
                cheque,
            };
        })
    );

    return {
        metodosRegistrados,
        metodos,
        transferencia,
        cheque
    };
};

module.exports = registrarMetodosPago;
