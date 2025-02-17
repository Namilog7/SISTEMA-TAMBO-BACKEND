const { ControlVeterinario, ControlGanado, Ganado } = require("../../../db");

const getControlVeterinario = async (req, res) => {
    try {
        // Obtener todos los controles veterinarios, incluyendo las caravanas de los ganados
        const response = await ControlVeterinario.findAll({
            include: {
                model: ControlGanado,
                include: {
                    model: Ganado,
                    attributes: ['caravana'], // Seleccionamos solo la columna 'caravana' de Ganado
                },
            },
        });

        // Mapear los resultados para incluir las caravanas en un array
        const result = response.map(control => {
            const caravanas = control.ControlGanados.map(ganado => ganado.Ganado.caravana);

            return {
                id: control.id,
                veterinario: control.veterinario,
                detalle: control.detalle,
                acta_url: control.acta_url,
                caravanas: caravanas,
            };
        });

        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ocurrió un error al obtener los controles." });
    }
};

module.exports = getControlVeterinario;
