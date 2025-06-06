const postCargarComprobante = require("../../controllers/caja/postCargarComprobante");
const { conn } = require("../../db");

const postCargarComprobanteHandler = async (req, res) => {
  const {
    datosFacturacion,
    arrayProductos,
    montoMetodos,
    cliente_proveedor,
    remito_factura,
  } = req.body;
  const transaction = await conn.transaction();
  try {
    const cargaComprobante = await postCargarComprobante(
      {
        datosFacturacion,
        arrayProductos,
        montoMetodos,
        cliente_proveedor,
        remito_factura,
      },
      transaction
    );
    await transaction.commit();
    res.json(cargaComprobante);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCargarComprobanteHandler;
