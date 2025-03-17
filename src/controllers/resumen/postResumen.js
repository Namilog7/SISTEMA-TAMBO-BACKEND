const createResumen = require("../../helpers/createResumen");
const putClienteProveedor = require("../../controllers/cliente/putClienteProveedor");

const postResumen = async ({ id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe, cuenta_corriente }, transaction) => {
    let resumen;
    let operacion;
    let id = id_afectado;

    if (nota_tipo === "CREDITO" || pago) {
        detalle = pago;
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.haber += Number(importe);
        operacion = "-";
        await putClienteProveedor({ id, importe, model, operacion }, transaction);
    }

    if (nota_tipo === "DEBITO" || factura || cuenta_corriente) {
        detalle = cuenta_corriente ? "Pasado a cuenta corriente" : factura;
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.debe += Number(importe);
        operacion = "+";
        await putClienteProveedor({ id, importe, model, operacion }, transaction);
    }

    await resumen.save({ transaction });
};

module.exports = postResumen;
