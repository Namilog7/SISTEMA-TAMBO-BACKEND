const { ControlVeterinario, Ganado } = require("../../../db");
const postCloudinary = require("../../../controllers/postCloudinary")

const postControlVeterinario = async (req, res) => {
    const { veterinario, detalle, arrayCaravanas, actaBase64 } = req.body;

    try {
        // Validar datos requeridos
        if (!veterinario || !arrayCaravanas || !actaBase64) {
            return res.status(400).json({ message: "Faltan datos necesarios o la imagen acta no es válida." });
        }

        if (!Array.isArray(arrayCaravanas) || arrayCaravanas.length === 0) {
            return res.status(400).json({ message: "El campo arrayCaravanas debe ser un array válido." });
        }

        // Subir la imagen usando la función mejorada
        const actaUrl = await postCloudinary(actaBase64, "control_veterinario");

        // Crear el registro en la base de datos
        const control = await ControlVeterinario.create({
            veterinario,
            detalle,
            acta_url: actaUrl, // Guardar la URL del acta subida a Cloudinary
        });

        // Validar que las caravanas de Ganado existan
        const ganados = await Ganado.findAll({
            where: {
                caravana: arrayCaravanas,
            },
        });

        if (ganados.length !== arrayCaravanas.length) {
            return res.status(400).json({ message: "Algunas caravanas de ganado no existen." });
        }

        // Asociar los ganados al control veterinario
        const fechaActual = new Date();
        const ganadosIds = ganados.map((ganado) => ganado.id);
        await control.addGanado(ganadosIds, { through: { fecha: fechaActual } });

        return res.status(201).json({
            message: "Control creado exitosamente.",
            control,
            acta_url: actaUrl,
        });
    } catch (error) {
        console.error("Error al crear el control veterinario:", error);
        return res.status(500).json({ message: "Ocurrió un error al crear el control veterinario." });
    }
};

module.exports = {
    postControlVeterinario,
};

