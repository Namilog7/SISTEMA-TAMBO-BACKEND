const { Ganado, ControlVeterinario, Inseminacion, InseminacionGanado } = require("../../../db");

const getGanado = async () => {
    try {
        const response = await Ganado.findAll({
            include: [
                {
                    model: ControlVeterinario,
                    through: {
                        attributes: ['fecha'], // Atributos de la tabla intermedia
                    },
                },
                {
                    model: Inseminacion,
                    through: {
                        model: InseminacionGanado, // Tabla intermedia
                        attributes: ['pajuela', "pajuela", "caravana"], // Atributos de la tabla intermedia
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

module.exports = getGanado;

