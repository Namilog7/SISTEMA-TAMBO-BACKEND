const { ControlVeterinario, ControlGanado } = require("../../../db");

const getControlVeterinario = async (req, res) => {
    try {
        // Obtenemos los controles veterinarios con sus caravanas de ControlGanado
        const response = await ControlVeterinario.findAll({
            include: {
                model: ControlGanado,
                attributes: ['caravana'], // Solo seleccionamos la columna 'caravana' de ControlGanado
            },
        });

        // Creamos el array de controles veterinarios con las caravanas incluidas
        const result = response.map(control => {
            // Extraemos las caravanas
            const caravanas = control.ControlGanados.map(ganado => ganado.caravana);

            // Devolvemos un objeto con los datos del control y las caravanas
            return {
                veterinario: control.veterinario,
                detalle: control.detalle,
                acta_url: control.acta_url,
                caravanas: caravanas
            };
        });

        // Devolvemos los datos modificados
        return res.json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al obtener los controles" });
    }
}

module.exports = getControlVeterinario;

