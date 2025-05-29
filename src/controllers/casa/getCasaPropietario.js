const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");

const getCasaPropietario = async (isCaja = false) => {
    const whereClause = isCaja ? {} : { nombre: { [require("sequelize").Op.ne]: "Caja" } };

    const casas = await CasaPropietario.findAll({
        where: whereClause,
        include: [
            {
                model: CompromisoDePago,
                include: [
                    { model: MesesCompromiso }
                ]
            }
        ]
    });

    return casas;
};

module.exports = getCasaPropietario;
