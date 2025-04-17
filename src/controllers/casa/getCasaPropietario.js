const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");
/* const resetCompromiso = require("../compromiso/resetCompromiso"); */

const getCasaPropietario = async () => {
    /*   const message = await resetCompromiso(id) */
    const casas = await CasaPropietario.findAll({
        include: [
            {
                model: CompromisoDePago,
                include: [
                    { model: MesesCompromiso }
                ]
            }
        ]
    });
    return casas
}

module.exports = getCasaPropietario;
