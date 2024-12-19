const { ControlVeterinario, Ganado } = require("../../db");

const postControlVeterinario = async (req, res) => {
    const { veterinario, detalle, arrayId } = req.body;

    try {
        // Validar que los datos necesarios están presentes
        if (!veterinario || !detalle || !arrayId || !Array.isArray(arrayId)) {
            return res.status(400).json({ message: "Faltan datos necesarios o arrayId no es válido." });
        }

        // Crear el registro de ControlVeterinario
        const control = await ControlVeterinario.create({
            veterinario,
            detalle,
        });

        // Validar que los IDs de Ganado existan
        const ganados = await Ganado.findAll({
            where: {
                id: arrayId,
            },
        });

        if (ganados.length !== arrayId.length) {
            return res.status(400).json({ message: "Algunos IDs de ganado no existen." });
        }

        // Asociar los ganados al control creado, incluyendo la fecha actual
        const fechaActual = new Date();

        const ganadosIds = ganados.map((ganado) => ganado.id);
        console.log(control instanceof ControlVeterinario)
        await control.addGanado(ganadosIds, { through: { fecha: fechaActual } });

        return res.status(201).json({ message: "Control creado exitosamente.", control });
    } catch (error) {
        console.error("Error al crear el control veterinario:", error);
        return res.status(500).json({ message: "Ocurrió un error al crear el control veterinario." });
    }
};

module.exports = postControlVeterinario;

