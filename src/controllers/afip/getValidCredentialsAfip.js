const { TokenSignAfip } = require('../../db');
const generateTokenSign = require('../afip/generateTokenSign');

const getValidCredentialsAfip = async () => {
  let record = await TokenSignAfip.findOne();

  const now = new Date();
  const isExpired = !record || new Date(record.fechaExpiracion) <= now;

  if (isExpired) {
    const { token, sign, fechaExpiracion } = await generateTokenSign();
    return { token, sign };
  }

  return {
    token: record.token,
    sign: record.sign,
  };
};

module.exports = getValidCredentialsAfip;
