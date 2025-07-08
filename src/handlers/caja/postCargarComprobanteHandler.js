const postCargarComprobante = require("../../controllers/caja/postCargarComprobante");
const { conn } = require("../../db");

const postCargarComprobanteHandler = async (req, res) => {
  const {
    id_sector_imputado,
    subarea,
    tipo_comprobante,
    numero_factura,
    fecha_emision,
    razon_social,
    cuit,
    otros_datos,
    productos, // {id_producto,descripcion,cantidad,unidad,precio,iva,total}
    total_general,
    total_productos,
    total_tributos
    /* datosFacturacion,
    arrayProductos,
    montoMetodos,
    cliente_proveedor,
    remito_factura, */
  } = req.body;
  const transaction = await conn.transaction();
  try {
    const cargaComprobante = await postCargarComprobante(
      {
        id_sector_imputado,
        subarea,
        tipo_comprobante,
        numero_factura,
        fecha_emision,
        razon_social,
        cuit,
        otros_datos,
        productos, // {id_producto,descripcion,cantidad,unidad,precio,iva,total}
        total_general,
        total_productos,
        total_tributos
      },
      transaction
    );
    await transaction.commit();
    res.json(cargaComprobante);
  } catch (error) {
    await transaction.rollback()
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCargarComprobanteHandler;
