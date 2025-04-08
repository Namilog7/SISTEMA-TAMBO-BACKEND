const { Ganado } = require("../db");
const { Op } = require("sequelize");

const resetInseminacion = async ({ arrayIngresos }, transaction) => {
    const caravanas = arrayIngresos.map(({ origen }) => origen);

    await Ganado.update(
        {
            inseminado: false,
            tipo: "VACA"
        },
        {
            where: {
                caravana: { [Op.in]: caravanas }
            },
            transaction
        }
    );

    return;
};

module.exports = resetInseminacion;

