const { Ganado } = require("..");
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
};

module.exports = resetInseminacion;
