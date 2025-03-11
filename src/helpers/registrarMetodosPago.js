const postMetodoGastoIngreso = require("../controllers/caja/postMetodoGastoIngreso");

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
