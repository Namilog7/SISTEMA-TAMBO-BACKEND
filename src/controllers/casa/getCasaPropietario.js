const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");
const resetCompromiso = require("../compromiso/resetCompromiso");

const getCasaPropietario = async (id) => {
    const message = await resetCompromiso(id)
    const casas = await CasaPropietario.findOne({
        where: { id },
        include: [
            {
                model: CompromisoDePago,
                include: [
                    { model: MesesCompromiso }
                ]
            }
        ]
    });
    return {
        casas,
        message
    }
}

module.exports = getCasaPropietario;
