const axios = require("axios");
const { parseStringPromise, parseString } = require("xml2js");
const getValidCredentialsAfip = require("./getValidCredentialsAfip");
require("dotenv").config();

const getUltimoComprobanteWSMTXCA = async ({ token, sign, tipoComprobante }) => {
    const xml = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://impl.service.wsmtxca.afip.gov.ar/service/">
<soapenv:Header/>
<soapenv:Body>
<ser:consultarUltimoComprobanteAutorizadoRequest>
  <authRequest>
    <token>${token}</token>
    <sign>${sign}</sign>
    <cuitRepresentada>20410340837</cuitRepresentada>
  </authRequest>
  <consultaUltimoComprobanteAutorizadoRequest>
    <codigoTipoComprobante>${tipoComprobante}</codigoTipoComprobante>
    <numeroPuntoVenta>1</numeroPuntoVenta>
  </consultaUltimoComprobanteAutorizadoRequest>
</ser:consultarUltimoComprobanteAutorizadoRequest>
</soapenv:Body>
</soapenv:Envelope>`.trim();

    try {
        const response = await axios.post("https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService", xml, {
            headers: {
                "Content-Type": "text/xml; charset=utf-8",
                SOAPAction:
                    "http://impl.service.wsmtxca.afip.gov.ar/service/consultarUltimoComprobanteAutorizadoRequest",
            },
        });

        const parsed = await parseStringPromise(response.data, { explicitArray: false });

        // Manejo de errores SOAP
        if (parsed["soapenv:Envelope"]?.["soapenv:Body"]?.["soapenv:Fault"]) {
            const fault = parsed["soapenv:Envelope"]["soapenv:Body"]["soapenv:Fault"];
            throw new Error(`Error AFIP: ${fault.faultstring}`);
        }

        const responseData =
            parsed["soapenv:Envelope"]?.["soapenv:Body"]?.["ns1:consultarUltimoComprobanteAutorizadoResponse"];

        if (!responseData) {
            throw new Error("Estructura de respuesta inesperada de AFIP");
        }

        return parseInt(responseData.numeroComprobante, 10) || 1; // Si no hay comprobantes, empezar desde 1
    } catch (error) {
        console.error("Error en getUltimoComprobanteWSMTXCA:", error.message);
        if (error.response) {
            console.error("Detalles error AFIP:", error.response.data);
        }
        throw error;
    }
};

const sendFacturaAfip = async ({ datos, alicuotas, items, tributos }) => {
    const { token, sign } = await getValidCredentialsAfip("wsmtxca");
    const ultimo = await getUltimoComprobanteWSMTXCA({ token, sign, tipoComprobante: datos.tipoComprobante });
    const nuevoNumero = ultimo + 1;
    const CUIT = 20410340837;
    const PUNTO_VENTA = 1;

    console.log(datos);

    const soapXML = `
<soapenv:Envelope 
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:ser="http://impl.service.wsmtxca.afip.gov.ar/service/"
    xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <soapenv:Header>
        <wsa:Action>http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAService/autorizarComprobanteRequest</wsa:Action>
        <wsa:To>https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService</wsa:To>
        <wsa:MessageID>urn:uuid:${Math.random().toString(36).substring(2, 15)}</wsa:MessageID>
        <wsa:ReplyTo>
            <wsa:Address>http://www.w3.org/2005/08/addressing/anonymous</wsa:Address>
        </wsa:ReplyTo>
    </soapenv:Header>
    <soapenv:Body>
        <ser:autorizarComprobanteRequest>
        <authRequest>
                <token>${token}</token>
                <sign>${sign}</sign>
                <cuitRepresentada>${CUIT}</cuitRepresentada>
              </authRequest>
              <comprobanteCAERequest>
                <codigoTipoComprobante>${datos.tipoComprobante}</codigoTipoComprobante>
                <numeroPuntoVenta>${PUNTO_VENTA}</numeroPuntoVenta>
                <numeroComprobante>${nuevoNumero}</numeroComprobante>
                <fechaEmision>${datos.fecha}</fechaEmision>
                <codigoTipoDocumento>${datos.tipoDocumento}</codigoTipoDocumento>
                <numeroDocumento>${datos.numeroDocumento}</numeroDocumento>   
                <condicionIVAReceptor>${datos.condicionIVACodigo}</condicionIVAReceptor>
                <importeGravado>${datos.importeNeto}</importeGravado>
                <importeNoGravado>${0}</importeNoGravado>
                <importeSubtotal>${datos.importeNeto}</importeSubtotal>
                ${tributos.length ? `<importeOtrosTributos>${datos.importeTributos}</importeOtrosTributos>` : ""}
                <importeTotal>${datos.importeTotal}</importeTotal>
                <codigoMoneda>${datos.divisa}</codigoMoneda>
                <cotizacionMoneda>${datos.cotizacion}</cotizacionMoneda>
                <codigoConcepto>${datos.concepto}</codigoConcepto>
                ${
                    datos.concepto === "2" || datos.concepto === "3"
                        ? `
                <fechaServicioDesde>${datos.fechaServDesde}</fechaServicioDesde>
                <fechaServicioHasta>${datos.fechaServHasta}</fechaServicioHasta>
                <fechaVencimientoPago>${datos.fechaVencimientoPago}</fechaVencimientoPago>
                `
                        : ""
                }

                ${
                    tributos.length
                        ? `
                <arrayOtrosTributos>
                    ${tributos.map(
                        (t) => `
                    <otroTributo>
                        <codigo>${t.codigo}</codigo>
                        <descripcion>${t.descripcion}</descripcion>
                        <baseImponible>${datos.importeNeto}</baseImponible>
                        <importe>${t.importe}</importe>
                    </otroTributo>
                    `
                    )}
                </arrayOtrosTributos>
                `
                        : ""
                }
                <arrayItems>
                  ${items
                      .filter((item) => item.descripcion)
                      .map(
                          (item) => `
                  <item>
                    <unidadesMtx>${item.unidad || 1}</unidadesMtx>
                    <codigoMtx>0000000000000</codigoMtx>
                    <descripcion>${item.descripcion.substring(0, 100)}</descripcion>
                    <cantidad>${item.cantidad}</cantidad>
                    <codigoUnidadMedida>${item.unidad}</codigoUnidadMedida> 
                    <precioUnitario>${item.precioUnitario}</precioUnitario>
                    <codigoCondicionIVA>${item.condIVA}</codigoCondicionIVA>
                    ${datos.tipoComprobante === "1" ? `<importeIVA>${item.importeIVA}</importeIVA>` : ""}
                    <importeItem>${item.importeTotal}</importeItem>
                  </item>
                  `
                      )
                      .join("")}
                  </arrayItems>
    
                  ${
                      alicuotas.length
                          ? `
                        <arraySubtotalesIVA>
                        ${alicuotas
                            .map(
                                (al) => `
                                <subtotalIVA>
                                <codigo>${al.id}</codigo>
                                <importe>${al.importe}</importe>
                                </subtotalIVA>
                                `
                            )
                            .join("")}
                                </arraySubtotalesIVA>
                           `
                          : ""
                  }

    
                
              </comprobanteCAERequest>
        </ser:autorizarComprobanteRequest>
    </soapenv:Body>
</soapenv:Envelope>
    `.trim();

    const response = await axios.post("https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService", soapXML, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "autorizarComprobanteRequest",
        },
    });

    // Parsea la respuesta con explicitArray: false para evitar arrays innecesarios
    const parsedResult = await parseStringPromise(response.data, {
        explicitArray: false,
        ignoreAttrs: true, // Ignora los atributos XML para simplificar
        tagNameProcessors: [require("xml2js").processors.stripPrefix], // Elimina prefijos de namespaces
    });

    console.log("Respuesta parseada completa:", JSON.stringify(parsedResult, null, 2));

    // Extrae la respuesta de autorización
    const responseBody = parsedResult.Envelope.Body;
    const autorizacionResponse = responseBody.autorizarComprobanteResponse;

    if (!autorizacionResponse) {
        throw new Error("Estructura de respuesta inesperada de AFIP");
    }

    // Verifica si fue aprobada (resultado "O" = Ok)
    if (autorizacionResponse.resultado !== "O") {
        const errores = autorizacionResponse.arrayErrores || [];
        throw new Error(`Factura rechazada por AFIP: ${errores.map((e) => e.descripcion).join(", ")}`);
    }

    // Extrae el CAE y datos importantes
    const comprobante = autorizacionResponse.comprobanteResponse;
    const cae = comprobante.CAE;
    const fechaVencimientoCAE = comprobante.fechaVencimientoCAE;
    const numeroComprobante = comprobante.numeroComprobante;

    console.log(`Factura autorizada con CAE ${cae}, válido hasta ${fechaVencimientoCAE}`);

    // Devuelve todos los datos relevantes
    return {
        cae,
        fechaVencimientoCAE,
        numeroComprobante,
        respuestaCompleta: autorizacionResponse,
        punto_venta: PUNTO_VENTA,
        json_data: {
            ver: 1,
            fecha_emision: datos.fecha,
            cuit: CUIT,
            punto_venta: PUNTO_VENTA,
            tipo_comprobante: datos.tipoComprobante,
            numeroComprobante: numeroComprobante,
            importe_total: datos.importeTotal,
            moneda: datos.divisa,
            cotizacion: datos.cotizacion,
            tipo_documento_receptor: datos.tipoDocumento,
            numero_documento_receptor: datos.numeroDocumento,
            tipo_codigo_autorizacion: "E", //! codigo de CAE
            codigo_autorizacion: cae,
        },
    };
};

module.exports = sendFacturaAfip;
