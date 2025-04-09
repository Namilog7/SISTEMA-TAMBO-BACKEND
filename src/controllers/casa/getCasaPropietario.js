const { CasaPropietario, CasaPagoEventual, CompromisoDePago } = require("../../db");
const resetCompromiso = require("../compromiso/resetCompromiso");

const getCasaPropietario = async () => {
    const message = await resetCompromiso()
    const casas = await CasaPropietario.findAll({
        include: [
            { model: CasaPagoEventual },
            { model: CompromisoDePago }
        ]
    });
    return {
        casas,
        message
    }
}

module.exports = getCasaPropietario;
