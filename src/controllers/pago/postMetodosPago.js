const { MetodoPago } = require("../../db");
const postPago = require("../../controllers/pago/postPago");
const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");
const postCheque = require("../../controllers/caja/cheque/postCheque");
const postResumen = require("../../controllers/resumen/postResumen");
const postMetodoGastoIngreso = require("../caja/postMetodoGastoIngreso");
const postGastoIngreso = require("../caja/postGastoIngreso");

/**
 * Registra múltiples métodos de pago y sus transacciones asociadas.
 *
 * @param {Object} params - Parámetros del pago.
 * @param {Array} params.metodos - Lista de métodos de pago a registrar.
 * @param {string} params.fecha - Fecha del pago.
 * @param {string} params.id_cliente - ID del cliente que realiza el pago (opcional).
 * @param {string} params.id_proveedor - ID del proveedor que recibe el pago (opcional).
 * @param {string} params.id_empleado - ID del proveedor que recibe el pago (opcional).
 * @param {string} [params.detalle=""] - Detalles adicionales del pago.
 * @param {string} params.model - Puede ser "CLIENTE" o "PROVEEDOR".
 * @param {Object} transaction - Transacción de Sequelize para garantizar atomicidad.
 *
 * @throws {Error} Si la lista de métodos de pago está vacía.
 *
 * @returns {Promise<Object>} Objeto con la información de los pagos registrados:
 *  - totalMetodos: Métodos de pago registrados en la base de datos.
 *  - resultado: Información sobre transferencias y cheques procesados.
 *  - nuevoResumen: Registro en el resumen de pagos.
 *
 * @description
 * - Crea un nuevo registro de pago en la base de datos.
 * - Recorre la lista de métodos de pago y los registra en la tabla `MetodoPago`.
 * - Si el método de pago es "TRANSFERENCIA", ejecuta `postTransferencia`.
 * - Si el método de pago es "CHEQUE", ejecuta `postCheque`.
 * - Registra cada método de pago en `postMetodoGastoIngreso`.
 * - Registra un nuevo gasto o ingreso en `postGastoIngreso`.
 * - Calcula el total del importe pagado y los métodos utilizados.
 * - Registra un resumen de la transacción en la base de datos.
 */

const postMetodosPago = async (
  {
    metodos,
    fecha,
    id_cliente,
    id_proveedor,
    id_empleado,
    detalle = "",
    model,
    id_sector,
  },
  transaction
) => {
  if (metodos.length === 0) throw new Error("No se enviaron métodos de pago.");

  const nuevoPago = await postPago(
    { detalle, fecha, id_cliente, id_proveedor, id_empleado },
    transaction
  );

  let totalMetodos = [];
  let resultado = {};
  let pagosUsados = [];
  let importe = 0;

  for (const metodo of metodos) {
    let metodoRegistrado = await MetodoPago.create(
      {
        id_pago: nuevoPago.id,
        detalle: metodo.detalle,
        fecha: metodo.fecha,
        id_cliente: metodo.id_cliente,
        id_proveedor: metodo.id_proveedor,
        id_empleado: metodo.id_empleado,
        importe: metodo.importe,
        metodo: metodo.metodo,
      },
      { transaction }
    );

    importe += Number(metodo.importe);
    totalMetodos.push(metodoRegistrado);
    pagosUsados.push(metodo.metodo);

    const { newGastoIngreso } = await postGastoIngreso(
      {
        detalle,
        estado: "ACEPTADO",
        tipo: id_cliente ? "INGRESO" : "EGRESO",
        fecha,
        id_sector,
      },
      transaction
    );

    console.log(newGastoIngreso);

    await postMetodoGastoIngreso(
      {
        id_gasto_ingreso: newGastoIngreso.id,
        metodo: metodo.metodo,
        monto: metodo.importe,
      },
      transaction
    );

    if (metodo.metodo === "TRANSFERENCIA" && metodo.datosTransferencia) {
      resultado.transferencia = await postTransferencia(
        metodo.datosTransferencia,
        transaction
      );
    }
    if (metodo.metodo === "CHEQUE" && metodo.datosCheque) {
      resultado.cheque = await postCheque(metodo.datosCheque, transaction);
    }
  }

  const id_afectado = id_cliente
    ? id_cliente
    : id_proveedor
    ? id_proveedor
    : id_empleado;
  const pago = pagosUsados.join(", ");

  const nuevoResumen = await postResumen(
    { id_afectado, fecha, detalle, pago, model, importe },
    transaction
  );

  return {
    totalMetodos,
    resultado,
    nuevoResumen,
  };
};

module.exports = postMetodosPago;
