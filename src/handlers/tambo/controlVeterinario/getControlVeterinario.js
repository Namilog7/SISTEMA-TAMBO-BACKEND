const { ControlVeterinario, Ganado } = require("../../../db");

const getControlVeterinarioConGanados = async (req, res) => {
    try {
        // Buscar control veterinario con los ganados asociados
        const controlVeterinario = await ControlVeterinario.findAll({
            include: {
                model: Ganado,
                through: { attributes: [] }, // Para no incluir los atributos de la tabla intermedia
            },
        });

        // Si no hay registros, devolver un error
        if (controlVeterinario.length === 0) {
            return res.status(404).json({ message: "No se encontró el control veterinario." });
        }

        // Responder con el control y los ganados asociados
        return res.json(controlVeterinario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Algo salió mal al obtener el control veterinario con los ganados." });
    }
};

module.exports = getControlVeterinarioConGanados;
