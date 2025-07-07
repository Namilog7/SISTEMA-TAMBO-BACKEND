const { GastoIngreso } = require("../../db");

const postGastoIngreso = async ({ detalle, estado, tipo, fecha, id_sector }, transaction) => {
    const nuevoGastoIngreso = await GastoIngreso.create(
        {
            detalle,
            estado,
            tipo,
            fecha,
            id_sector,
        },
        { transaction }
    );

    return { nuevoGastoIngreso };
};

module.exports = postGastoIngreso;
