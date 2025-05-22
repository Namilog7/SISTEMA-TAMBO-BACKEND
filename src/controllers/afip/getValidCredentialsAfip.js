const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { TokenSignAfip } = require('../../db');
const { parseStringPromise } = require('xml2js');

const CERT_PATH = path.join(__dirname, '../certs/certificate.crt');
const KEY_PATH = path.join(__dirname, '../certs/private.key');
const SERVICE_ID = 'wsfe';
const WSDL_URL = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms';

const generateLoginCms = () => {
  const date = new Date();
  const uniqueId = date.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const generationTime = new Date(date.getTime() - 600000).toISOString(); // -10 min
  const expirationTime = new Date(date.getTime() + 600000).toISOString(); // +10 min

  const tra = `
<loginTicketRequest version="1.0">
  <header>
    <uniqueId>${uniqueId}</uniqueId>
    <generationTime>${generationTime}</generationTime>
    <expirationTime>${expirationTime}</expirationTime>
  </header>
  <service>${SERVICE_ID}</service>
</loginTicketRequest>
  `.trim();

  const traPath = path.join(__dirname, `./LoginTicketRequest.xml`);
  fs.writeFileSync(traPath, tra);

  const cmsPath = path.join(__dirname, './LoginTicketRequest.cms');

  execSync(`openssl cms -sign -in ${traPath} -signer ${CERT_PATH} -inkey ${KEY_PATH} -nodetach -outform DER -out ${cmsPath}`);
  const cms = fs.readFileSync(cmsPath).toString('base64');

  return cms;
};

const callWsaa = async (cmsBase64) => {
  const body = `
  <?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:wsaa="http://wsaa.view.sua.dvadac.desein.afip.gov">
    <soapenv:Header/>
    <soapenv:Body>
      <wsaa:loginCms>
        <wsaa:in0>${cmsBase64}</wsaa:in0>
      </wsaa:loginCms>
    </soapenv:Body>
  </soapenv:Envelope>
  `.trim();

  const response = await axios.post(WSDL_URL, body, {
    headers: {
      'Content-Type': 'text/xml',
      'SOAPAction': '',
    }
  });

  const parsed = await parseStringPromise(response.data, { explicitArray: false });
  const loginCmsReturn = parsed['soapenv:Envelope']['soapenv:Body']['loginCmsResponse']['loginCmsReturn'];

  const parsedXml = await parseStringPromise(loginCmsReturn, { explicitArray: false });

  const credentials = parsedXml.loginTicketResponse.credentials;
  return {
    token: credentials.token,
    sign: credentials.sign,
    expiration: new Date(credentials.expirationTime),
  };
};

const getValidCredentialsAfip = async () => {
  let record = await TokenSignAfip.findOne();

  const now = new Date();
  const isExpired = !record || new Date(record.expiration_time) <= now;

  if (isExpired) {
    const cms = generateLoginCms();
    const { token, sign, expiration } = await callWsaa(cms);

    if (record) {
      await record.update({ token, sign, expiration_time: expiration });
    } else {
      record = await TokenSignAfip.create({
        token,
        sign,
        expiration_time:
          expiration
      });
    }

    return { token, sign };
  }

  return {
    token: record.token,
    sign: record.sign,
  };
};

module.exports = getValidCredentialsAfip;
