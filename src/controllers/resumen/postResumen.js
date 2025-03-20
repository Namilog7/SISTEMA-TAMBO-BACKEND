const createResumen = require("../../helpers/createResumen");
const putClienteProveedor = require("../../controllers/cliente/putClienteProveedor");

const postResumen = async ({ id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe }, transaction) => {
    let resumen;
    let operacion;
    let id = id_afectado;

    if (nota_tipo === "CREDITO" || pago) {
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.haber += Number(importe);
        operacion = "-";
        await putClienteProveedor({ id, importe, model, operacion }, transaction);
    }

    else if (nota_tipo === "DEBITO" || factura) {
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.debe += Number(importe);
        operacion = "+";
        await putClienteProveedor({ id, importe, model, operacion }, transaction);
    }
    else { throw new Error("Algo fallo en postResumen") }

    await resumen.save({ transaction });
};

module.exports = postResumen;
