const { FacturaArca, ProductoFacturaArca, TributosFacturaArca } = require("../../db");

const cargarDatosATablaArca = async (dataFactura, productos, tributos) => {
    console.log(dataFactura);

    const fac = await FacturaArca.create({
        tipo: dataFactura.tipoComprobante === "1" ? "A" : "B",
        numero: dataFactura.numeroComprobante,
        fecha_emision: dataFactura.fecha,
        // fecha_serv_desde: dataFactura.fechaServDesde,
        // fecha_serv_hasta: dataFactura.fechaServHasta,
        // fecha_vencimiento_pago: dataFactura.fechaVencimientoPago,
        condicion_venta: dataFactura.condicionDeVenta,
        numero_documento: dataFactura.numeroDocumento,
        nombre_destinatario: dataFactura.nombreDestinatario,
        direccion: dataFactura.direccion,
        divisa: dataFactura.divisa,
        importeNeto: dataFactura.importeNeto,
        condicion_frente_al_iva: dataFactura.condicionIVA,
        total: dataFactura.importeTotal,
        cae: dataFactura.cae,
        cae_vencimiento: dataFactura.fechaVencimientoCAE,
        qr: dataFactura.qr,
        punto_venta: dataFactura.punto_venta,
        id_cliente: dataFactura.id_cliente || null,
    });

    productos.forEach(async (p) => {
        await ProductoFacturaArca.create({
            descripcion: p.descripcion,
            cantidad: p.cantidad,
            unidad_medida: p.unidad_label,
            precio_unidad: p.precioUnitario,
            iva: p.condIVA,
            sub_total: p.cantidad * p.precioUnitario,
            total: p.importeTotal,
            id_factura_arca: fac.id,
        });
    });

    tributos.forEach(async (p) => {
        await TributosFacturaArca.create({
            codigo: p.codigo,
            descripcion: p.descripcion,
            alicuota: p.alicuota,
            importe: p.importe,
            id_factura_arca: fac.id,
        });
    });

    return fac;
};

module.exports = cargarDatosATablaArca;
