const { CasaPropietario, CompromisoDePago, MesesPago } = require("../../db");
const resetCompromiso = require("../compromiso/resetCompromiso");

const getCasaPropietario = async (id) => {
    const message = await resetCompromiso(id)
    const casas = await CasaPropietario.findAll({
        where: { id },
        include: [
            { model: CompromisoDePago },
            { model: MesesPago }
        ]
    });
    return {
        casas,
        message
    }
}

module.exports = getCasaPropietario;
