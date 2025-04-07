const { Ganado } = require("../db");
const { Op } = require("sequelize");

const resetInseminacion = async ({ arrayIngresos }, transaction) => {
    const caravanas = arrayIngresos.map(({ caravana_madre }) => caravana_madre);

    await Ganado.update(
        {
            inseminado: false,
            tipo: "VACA"
        },
        {
            where: {
                caravana: { [Op.in]: caravanas },
                transaction
            }
        }
    );
    return
};

module.exports = resetInseminacion;
