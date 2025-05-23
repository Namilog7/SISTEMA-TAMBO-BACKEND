const sendFacturaAFIP = require('../../controllers/afip/sendFacturaAfip');

const postFacturaHandler = async (req, res) => {
  const {
    fecha,
    tipoComprobante,
    concepto,
    tipoDocumento,
    numeroDocumento,
    importeTotal,
    importeNeto,
    divisa,
    cotizacion,
  } = req.body;

  try {
    const responseContent = await sendFacturaAFIP({
      fecha,
      tipoComprobante,
      concepto,
      tipoDocumento,
      numeroDocumento,
      importeTotal,
      importeNeto,
      divisa,
      cotizacion,
    });

    res.status(200).json(responseContent);
  } catch (error) {
    console.error('Error al enviar factura a AFIP:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postFacturaHandler;

