const postMetodoGastoIngreso = require("../controllers/caja/postMetodoGastoIngreso");

/**
 * Registra múltiples métodos de pago para un gasto/ingreso.
 *
 * @param {number} id_gasto_ingreso - ID del gasto/ingreso al que se asocian los métodos de pago.
 * @param {Array<{ metodo: string, monto: number }>} metodosPago - Lista de métodos de pago con su metodo de pago y monto.
 * @param {Object} [transaction] - Transacción para asegurar que se compla todas las operaciones para concluir.
 * @returns {Promise<Array>} - Retorna un array con los métodos de pago registrados.
 * @throws {Error} - Lanza un error si ocurre algún problema durante el registro.
 */
const registrarMetodosPago = async (id_gasto_ingreso, metodosPago, transaction) => {
    if (!Array.isArray(metodosPago) || metodosPago.length === 0) {
        return [];
    }

    const metodosRegistrados = await Promise.all(
        metodosPago.map(async (metodo) => {
            return await postMetodoGastoIngreso({
                id_gasto_ingreso,
                metodo: metodo.metodo,
                monto: metodo.monto
            }, transaction);
        })
    );

    return metodosRegistrados;
};

module.exports = registrarMetodosPago;

