const { TokenSignAfip } = require("../../db");
const generateTokenSign = require("../afip/generateTokenSign");

const { Op } = require("sequelize");

const getValidCredentialsAfip = async (service = "wsmtxca") => {
    const now = new Date();
    const validToken = await TokenSignAfip.findOne({
        where: {
            service,
            fechaExpiracion: { [Op.gt]: now },
        },
    });

    // 2. Si existe token vigente, devolverlo
    if (validToken) {
        return {
            token: validToken.token,
            sign: validToken.sign,
        };
    }

    const { token, sign, fechaExpiracion } = await generateTokenSign(service);

    await TokenSignAfip.create({
        token,
        sign,
        fechaExpiracion: new Date(fechaExpiracion),
        service,
    });

    return { token, sign };
};

module.exports = getValidCredentialsAfip;
