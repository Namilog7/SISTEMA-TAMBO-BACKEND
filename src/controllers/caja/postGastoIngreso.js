const { GastoIngreso } = require("../../db");

const postGastoIngreso = async ({ detalle, estado, tipo, fecha, id_sector }, transaction) => {

    const nuevoGastoIngreso = await GastoIngreso.create({
        detalle,
        estado,
        tipo,
        fecha,
        id_sector,
    }, { transaction });
    console.log(nuevoGastoIngreso)
    return { nuevoGastoIngreso };
};

module.exports = postGastoIngreso;
