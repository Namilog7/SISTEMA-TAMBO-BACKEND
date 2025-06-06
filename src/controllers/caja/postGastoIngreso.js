const { GastoIngreso } = require("../../db");

const postGastoIngreso = async ({ detalle, estado, tipo, fecha, id_sector }, transaction) => {

    const newGastoIngreso = await GastoIngreso.create({
        detalle,
        estado,
        tipo,
        fecha,
        id_sector,
    }, { transaction });

    return { newGastoIngreso };
};

module.exports = postGastoIngreso;
