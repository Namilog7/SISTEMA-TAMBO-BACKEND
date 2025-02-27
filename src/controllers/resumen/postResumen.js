const { ResumenCuenta } = require("../../db");
const createResumen = require("../../helpers/createResumen");

const postResumen = async ({ id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe }) => {
    let resumen;

    if (nota_tipo === "CREDITO" || pago) {
        // Haber (Ingreso de dinero)
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle, pago, factura });
        resumen.haber = (resumen.haber || 0) + importe;
    }

    if (nota_tipo === "DEBITO" || factura) {
        // Debe (Salida de dinero)
        resumen = await createResumen({ model, id_afectado, nota_tipo, fecha, detalle, pago, factura });
        resumen.debe = (resumen.debe || 0) - importe;
    }

    await resumen.save();
};

module.exports = postResumen;

