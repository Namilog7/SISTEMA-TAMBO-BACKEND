const actualizarInsumo = require("./transferencia/actualizarInsumos");
const { Comprobante, ComprobanteInsumo } = require("../../db");

const postCargarComprobante = async (
    {
        id_sector_imputado,
        subarea,
        tipo_comprobante,
        numero_factura,
        fecha_emision,
        razon_social,
        cuit,
        otros_datos,
        productos, // { id_producto, descripcion, cantidad, unidad, precio, iva, total }
        total_general,
        total_productos,
        total_tributos,
        id_proveedor,
    },
    transaction
) => {
    const comprobante = await Comprobante.create(
        {
            tipo_comprobante,
            numero_factura,
            fecha: fecha_emision,
            razon_social,
            cuit,
            otros_datos,
            total_general,
            total_productos,
            total_tributos,
            id_sector_imputado,
            subarea,
        },
        { transaction }
    );

    if (subarea === "Compra de insumos") {
        const insumosProcesados = await actualizarInsumo(
            { productos, razon_social, id_proveedor, id_sector_imputado, fecha: fecha_emision },
            transaction
        );

        for (const item of insumosProcesados) {
            await ComprobanteInsumo.create(
                {
                    id_comprobante: comprobante.id,
                    id_insumo: item.insumo.id,
                    cantidad: item.cantidad,
                    unidad: item.unidad,
                    precio: item.precio,
                    iva: item.iva,
                    total: item.total,
                },
                { transaction }
            );
        }
    }
};

module.exports = postCargarComprobante;
