const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");
const { Op } = require("sequelize");

const getCasaPropietario = async (isCaja = false) => {
    const whereClause = isCaja
        ? { nombre: "Caja" }
        : { nombre: { [Op.ne]: "Caja" } };

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
