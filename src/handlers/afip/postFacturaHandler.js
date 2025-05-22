const axios = require('axios');
const { parseStringPromise } = require('xml2js');
require('dotenv').config();

const postFacturaHandler = async (req, res) => {
  // puntoDeVenta, dniDesinatario, fecha, importeTotal, importeNeto, Impuestos, tipoDeFactura

  try {
    const soapXML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FECAESolicitar>
      <ar:Auth>
        <ar:Token>${process.env.TOKEN}</ar:Token>
        <ar:Sign>${process.env.SIGN}</ar:Sign>
        <ar:Cuit>${process.env.CUIT}</ar:Cuit>
      </ar:Auth>
      <ar:FeCAEReq>
        <ar:FeCabReq>
          <ar:CantReg>1</ar:CantReg>
          <ar:PtoVta>12</ar:PtoVta>
          <ar:CbteTipo>1</ar:CbteTipo>
        </ar:FeCabReq>
        <ar:FeDetReq>
          <ar:FECAEDetRequest>
            <ar:Concepto>1</ar:Concepto>
            <ar:DocTipo>80</ar:DocTipo>
            <ar:DocNro>20111111112</ar:DocNro>
            <ar:CbteDesde>2</ar:CbteDesde>
            <ar:CbteHasta>2</ar:CbteHasta>
            <ar:CbteFch>20250519</ar:CbteFch>
            <ar:ImpTotal>184.05</ar:ImpTotal>
            <ar:ImpTotConc>0</ar:ImpTotConc>
            <ar:ImpNeto>150</ar:ImpNeto>
            <ar:ImpOpEx>0</ar:ImpOpEx>
            <ar:ImpTrib>7.8</ar:ImpTrib>
            <ar:ImpIVA>26.25</ar:ImpIVA>
            <ar:FchServDesde></ar:FchServDesde>
            <ar:FchServHasta></ar:FchServHasta>
            <ar:FchVtoPago></ar:FchVtoPago>
            <ar:MonId>PES</ar:MonId>
            <ar:MonCotiz>1</ar:MonCotiz>
            <ar:Tributos>
              <ar:Tributo>
                <ar:Id>99</ar:Id>
                <ar:Desc>Impuesto Municipal Matanza</ar:Desc>
                <ar:BaseImp>150</ar:BaseImp>
                <ar:Alic>5.2</ar:Alic>
                <ar:Importe>7.8</ar:Importe>
              </ar:Tributo>
            </ar:Tributos>
            <ar:Iva>
              <ar:AlicIva>
                <ar:Id>5</ar:Id>
                <ar:BaseImp>100</ar:BaseImp>
                <ar:Importe>21</ar:Importe>
              </ar:AlicIva>
              <ar:AlicIva>
                <ar:Id>4</ar:Id>
                <ar:BaseImp>50</ar:BaseImp>
                <ar:Importe>5.25</ar:Importe>
              </ar:AlicIva>
            </ar:Iva>
          </ar:FECAEDetRequest>
        </ar:FeDetReq>
      </ar:FeCAEReq>
    </ar:FECAESolicitar>
  </soapenv:Body>
</soapenv:Envelope>
        `.trim();

    const response = await axios.post(
      'https://wswhomo.afip.gov.ar/wsfev1/service.asmx',
      soapXML,
      {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'http://ar.gov.afip.dif.FEV1/FECAESolicitar',
        },
      }
    );

    const parsedResult = await parseStringPromise(response.data, { explicitArray: false });

    /*     const responseContent = parsedResult['soap:Envelope']?.['soap:Body']?.['ar:FECAESolicitarResponse']
          || parsedResult['soapenv:Envelope']?.['soapenv:Body']; */

    const responseContent = parsedResult['soap:Envelope']?.['soap:Body']?.['FECAESolicitarResponse'];

    res.status(200).json(responseContent);
  } catch (error) {
    console.error('Error al enviar factura a AFIP:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postFacturaHandler;

