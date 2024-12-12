const { Ganado, ControlVeterinario } = require("../../db");

const getGanado = async () => {
    try {
        const response = await Ganado.findAll({
            include: [
                {
                    model: ControlVeterinario,
                    through: {
                        attributes: ['fecha'],
                    },
                },
            ],
        });
        return response;
    } catch (error) {
        console.error("Error fetching Ganado:", error);
        throw error;
    }
};

module.exports = getGanado
