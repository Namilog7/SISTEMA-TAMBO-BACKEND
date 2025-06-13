const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const getValidCredentialsAfip = require("./getValidCredentialsAfip");
require("dotenv").config();

const getUltimoComprobante = async ({ token, sign, tipoComprobante }) => {
    const xml = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FECompUltimoAutorizado>
      <ar:Auth>
        <ar:Token>${token}</ar:Token>
        <ar:Sign>${sign}</ar:Sign>
        <ar:Cuit>${20410340837}</ar:Cuit>
      </ar:Auth>
      <ar:PtoVta>1</ar:PtoVta>
      <ar:CbteTipo>${tipoComprobante}</ar:CbteTipo>
    </ar:FECompUltimoAutorizado>
  </soapenv:Body>
</soapenv:Envelope>
  `.trim();

    const response = await axios.post("https://wswhomo.afip.gov.ar/wsfev1/service.asmx", xml, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://ar.gov.afip.dif.FEV1/FECompUltimoAutorizado",
        },
    });

    const parsed = await parseStringPromise(response.data, { explicitArray: false });
    const result =
        parsed["soap:Envelope"]["soap:Body"]["FECompUltimoAutorizadoResponse"]["FECompUltimoAutorizadoResult"];
    return parseInt(result.CbteNro, 10);
};

const getCondicionIvaReceptor = async ({ token, sign, cuitReceptor }) => {
    const xml = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FEParamGetCondicionIvaReceptor>
      <ar:Auth>
        <ar:Token>${token}</ar:Token>
        <ar:Sign>${sign}</ar:Sign>
        <ar:Cuit>${20410340837}</ar:Cuit>
      </ar:Auth>
      <ar:CuitReceptor>${cuitReceptor}</ar:CuitReceptor>
    </ar:FEParamGetCondicionIvaReceptor>
  </soapenv:Body>
</soapenv:Envelope>
  `.trim();

    const response = await axios.post("https://wswhomo.afip.gov.ar/wsfev1/service.asmx", xml, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://ar.gov.afip.dif.FEV1/FEParamGetCondicionIvaReceptor",
        },
    });

    const parsed = await parseStringPromise(response.data, { explicitArray: false });
    const resultado = parsed["soap:Envelope"]?.["soap:Body"]?.["FEParamGetCondicionIvaReceptorResponse"];

    return resultado?.CondicionIVAReceptor || null;
};

const sendFacturaAfip = async ({
    fecha,
    tipoComprobante,
    concepto,
    tipoDocumento,
    numeroDocumento,
    importeNeto,
    divisa,
    cotizacion,
    iva,
}) => {
    const { token, sign } = await getValidCredentialsAfip("wsmtxca");
    const condicionIVA = await getCondicionIvaReceptor({ token, sign, cuitReceptor: numeroDocumento });
    console.log("Condición IVA receptor:", condicionIVA);
    const ultimo = await getUltimoComprobante({ token, sign, tipoComprobante });
    const nuevoNumero = ultimo + 1;

    const ivaImporte =
        iva === "4"
            ? (importeNeto * 10.5) / 100
            : iva === "5"
            ? (importeNeto * 21) / 100
            : iva === "6"
            ? (importeNeto * 27) / 100
            : 0;
    console.log("importe iva:", ivaImporte);

    const importeTotal = Number(importeNeto) + Number(ivaImporte);
    console.log("importe total:", importeTotal);

    const soapXML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FECAESolicitar>
      <ar:Auth>
        <ar:Token>${token}</ar:Token>
        <ar:Sign>${sign}</ar:Sign>
        <ar:Cuit>${20410340837}</ar:Cuit>
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
            <ar:CbteDesde>${nuevoNumero}</ar:CbteDesde>
            <ar:CbteHasta>${nuevoNumero}</ar:CbteHasta>
            <ar:CbteFch>${fecha}</ar:CbteFch>
            <ar:ImpTotal>${importeTotal}</ar:ImpTotal>
            <ar:ImpTotConc>0</ar:ImpTotConc>
            <ar:ImpNeto>${importeNeto}</ar:ImpNeto>
            <ar:ImpOpEx>0</ar:ImpOpEx>
            <ar:ImpTrib>0</ar:ImpTrib>
            <ar:ImpIVA>${ivaImporte}</ar:ImpIVA>
            <ar:FchServDesde></ar:FchServDesde>
            <ar:FchServHasta></ar:FchServHasta>
            <ar:FchVtoPago></ar:FchVtoPago>
            <ar:MonId>${divisa}</ar:MonId>
            <ar:MonCotiz>${cotizacion}</ar:MonCotiz>
            <ar:Iva>
              <ar:AlicIva>
                <ar:Id>${iva}</ar:Id>
                <ar:BaseImp>${importeNeto}</ar:BaseImp>
                <ar:Importe>${ivaImporte}</ar:Importe>
              </ar:AlicIva>
            </ar:Iva>
          </ar:FECAEDetRequest>
        </ar:FeDetReq>
      </ar:FeCAEReq>
    </ar:FECAESolicitar>
  </soapenv:Body>
</soapenv:Envelope>
  `.trim();

    const response = await axios.post("https://wswhomo.afip.gov.ar/wsfev1/service.asmx", soapXML, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://ar.gov.afip.dif.FEV1/FECAESolicitar",
        },
    });

    const parsedResult = await parseStringPromise(response.data, { explicitArray: false });
    return parsedResult["soap:Envelope"]?.["soap:Body"]?.["FECAESolicitarResponse"];
};

module.exports = sendFacturaAfip;
