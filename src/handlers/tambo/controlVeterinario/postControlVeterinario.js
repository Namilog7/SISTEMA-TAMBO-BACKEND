const { ControlVeterinario, Ganado } = require("../../../db");
const cloudinary = require("cloudinary").v2;

// Configura Cloudinary con variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postControlVeterinario = async (req, res) => {
    const { veterinario, detalle, arrayCaravanas, actaBase64 } = req.body;

    try {
        // Validar datos requeridos
        if (!veterinario || !arrayCaravanas || !actaBase64) {
            return res.status(400).json({ message: "Faltan datos necesarios o la imagen acta no es válida." });
        }

        /* const caravanas = JSON.parse(arrayCaravanas); */

        if (!Array.isArray(arrayCaravanas) || arrayCaravanas.length === 0) {
            return res.status(400).json({ message: "El campo arrayCaravanas debe ser un array válido." });
        }

        // Subir la imagen a Cloudinary desde Base64
        const uploadResult = await cloudinary.uploader.upload(`data:image/png;base64,${actaBase64}`, {
            folder: "control_veterinario",
        });

        // Crear el registro en la base de datos
        const control = await ControlVeterinario.create({
            veterinario,
            detalle,
            acta_url: uploadResult.secure_url, // Guardar la URL del acta subida a Cloudinary
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
            acta_url: uploadResult.secure_url,
        });
    } catch (error) {
        console.error("Error al crear el control veterinario:", error);
        return res.status(500).json({ message: "Ocurrió un error al crear el control veterinario." });
    }
};

module.exports = {
    postControlVeterinario,
};
