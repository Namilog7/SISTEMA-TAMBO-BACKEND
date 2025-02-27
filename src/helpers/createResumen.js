const { ResumenCuenta } = require("../db");

const createResumen = async ({ model, id_afectado, ...obj }) => {
    let resumen;
    if (model === "CLIENTE") {
        resumen = await ResumenCuenta.create({
            ...obj,
            id_cliente: id_afectado
        });
    } else if (model === "PROVEEDOR") {
        resumen = await ResumenCuenta.create({
            ...obj,
            id_proveedor: id_afectado
        });
    }
    return resumen;
};

module.exports = createResumen;
