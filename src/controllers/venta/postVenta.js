const { Venta } = require("../../db");

const postVenta = async ({ id_cliente, monto, fecha, numero, nombre_cliente, detalle }, transaction) => {
    const venta = await Venta.create(
        {
            id_cliente,
            monto,
            fecha,
            numero_factura: numero || null,
            nombre_cliente,
            detalle,
        },
        { transaction }
    );

    return venta;
};

module.exports = postVenta;
