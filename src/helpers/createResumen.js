const { ResumenCuenta } = require("../db");

const createResumen = async ({ model, id_afectado, ...obj }, transaction) => {
    let resumen;
    if (model === "CLIENTE") {
        resumen = await ResumenCuenta.create(
            {
                ...obj,
                id_cliente: id_afectado,
            },
            { transaction }
        );
    } else if (model === "PROVEEDOR") {
        resumen = await ResumenCuenta.create(
            {
                ...obj,
                id_proveedor: id_afectado,
            },
            { transaction }
        );
    } else if (model === "EMPLEADO") {
        resumen = await ResumenCuenta.create(
            {
                ...obj,
                id_empleado: id_afectado,
            },
            { transaction }
        );
    }
    return resumen;
};

module.exports = createResumen;
