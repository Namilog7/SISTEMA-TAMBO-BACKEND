const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const getValidCredentialsAfip = require('./getValidCredentialsAfip');
require('dotenv').config();

const sendFacturaAfip = async ({
    fecha,
    tipoComprobante,
    concepto,
    tipoDocumento,
    numeroDocumento,
    importeTotal,
    importeNeto,
    divisa,
    cotizacion,
}) => {
    const { token, sign } = await getValidCredentialsAfip()
    const soapXML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FECAESolicitar>
      <ar:Auth>
        <ar:Token>${token}</ar:Token>
        <ar:Sign>${sign}</ar:Sign>
        <ar:Cuit>${process.env.CUIT}</ar:Cuit>
      </ar:Auth>
      <ar:FeCAEReq>
        <ar:FeCabReq>
          <ar:CantReg>1</ar:CantReg>
          <ar:PtoVta>1</ar:PtoVta>
          <ar:CbteTipo>${tipoComprobante}</ar:CbteTipo>
        </ar:FeCabReq>
        <ar:FeDetReq>
          <ar:FECAEDetRequest>
            <ar:Concepto>${concepto}</ar:Concepto>
            <ar:DocTipo>${tipoDocumento}</ar:DocTipo>
            <ar:DocNro>${numeroDocumento}</ar:DocNro>
            <ar:CbteDesde>2</ar:CbteDesde> 
            <ar:CbteHasta>2</ar:CbteHasta>
            <ar:CbteFch>${fecha}</ar:CbteFch>
            <ar:ImpTotal>${importeTotal}</ar:ImpTotal>
            <ar:ImpTotConc>0</ar:ImpTotConc>
            <ar:ImpNeto>${importeNeto}</ar:ImpNeto>
            <ar:ImpOpEx>0</ar:ImpOpEx>
            <ar:ImpTrib>7.8</ar:ImpTrib>
            <ar:ImpIVA>26.25</ar:ImpIVA>
            <ar:FchServDesde></ar:FchServDesde>
            <ar:FchServHasta></ar:FchServHasta>
            <ar:FchVtoPago></ar:FchVtoPago>
            <ar:MonId>${divisa}</ar:MonId>
            <ar:MonCotiz>${cotizacion}</ar:MonCotiz>
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
    return parsedResult['soap:Envelope']?.['soap:Body']?.['FECAESolicitarResponse'];
};

module.exports = sendFacturaAfip;
