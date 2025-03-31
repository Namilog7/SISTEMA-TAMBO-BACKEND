const { CasaPropietario, CasaPagoEventual, CompromisoDePago } = require("../../db");

const getCasaPropietario = async () => {
    const casas = await CasaPropietario.findAll({
        include: [
            { model: CasaPagoEventual },
            { model: CompromisoDePago }
        ]
    });
    return casas
}

module.exports = getCasaPropietario;
