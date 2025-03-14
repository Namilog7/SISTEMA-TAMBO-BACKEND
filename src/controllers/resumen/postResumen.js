const createResumen = require("../../helpers/createResumen");
const putClienteProveedor = require("../../controllers/cliente/putClienteProveedor");

const postResumen = async ({ id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe }, transaction) => {
    let resumen;
    let operacion;
    let id = id_afectado;
    if (nota_tipo === "CREDITO" || pago) {
        // Haber (Ingreso de dinero)
        detalle = pago
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.haber = resumen.haber += importe;
        operacion = "+"
        await putClienteProveedor({ id, importe, model, operacion }, transaction)
    }

    if (nota_tipo === "DEBITO" || factura) {
        // Debe (Salida de dinero)
        detalle = factura
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle }, transaction);
        resumen.debe = resumen.debe -= importe;
        operacion = "-"
        await putClienteProveedor({ id, importe, model, operacion }, transaction)
    }

    await resumen.save({ transaction });
};

module.exports = postResumen;

