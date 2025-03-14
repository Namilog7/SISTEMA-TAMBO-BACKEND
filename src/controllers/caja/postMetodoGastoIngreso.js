const { GastoIngreso, MetodoGastoIngreso } = require("../../db");
const putSaldoCaja = require("./putSaldoCaja");

const postMetodoGastoIngreso = async ({ id_gasto_ingreso, metodo, monto }, transaction) => {
    if (!id_gasto_ingreso || !metodo || monto === undefined) {
        throw new Error("Faltan datos obligatorios");
    }

    const importe = Number(monto);
    if (isNaN(importe) || importe <= 0) {
        throw new Error("El importe debe ser un número válido y mayor a 0");
    }

    const gastoIngreso = await GastoIngreso.findByPk(id_gasto_ingreso, { transaction });
    if (!gastoIngreso) {
        throw new Error("El gasto/ingreso no existe");
    }

    await MetodoGastoIngreso.create({
        id_gasto_ingreso,
        metodo,
        monto: importe,
    }, { transaction });

    await putSaldoCaja({ metodo, gastoIngreso, importe }, transaction)
    return

};

module.exports = postMetodoGastoIngreso;
