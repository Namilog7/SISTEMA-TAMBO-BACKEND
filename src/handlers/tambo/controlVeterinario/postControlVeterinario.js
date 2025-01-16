const { ControlVeterinario, Ganado } = require("../../../db");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configura tus credenciales de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de Multer para manejar archivos
const upload = multer({ dest: "uploads/" }); // Archivo temporal

const postControlVeterinario = async (req, res) => {
    const { veterinario, detalle, arrayCaravanas } = req.body;
    const acta = req.file; // Archivo subido

    try {
        // Validar que los datos necesarios están presentes
        if (!veterinario || !detalle || !arrayCaravanas || !acta) {
            return res.status(400).json({ message: "Faltan datos necesarios o archivo acta no es válido." });
        }

        // Parsear arrayCaravanas (viene como string JSON en multipart/form-data)
        const caravanas = JSON.parse(arrayCaravanas);

        if (!Array.isArray(caravanas) || caravanas.length === 0) {
            return res.status(400).json({ message: "El campo arrayCaravanas debe ser un array válido." });
        }

        // Subir el acta a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(acta.path, {
            folder: "control_veterinario",
        });

        // Crear el registro de ControlVeterinario
        const control = await ControlVeterinario.create({
            veterinario,
            detalle,
            acta_url: uploadResult.secure_url, // Guardar la URL del acta
        });

        // Validar que las caravanas de Ganado existan
        const ganados = await Ganado.findAll({
            where: {
                caravana: caravanas,
            },
        });

        if (ganados.length !== caravanas.length) {
            return res.status(400).json({ message: "Algunas caravanas de ganado no existen." });
        }

        // Asociar los ganados al control creado, incluyendo la fecha actual
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
    upload,
    postControlVeterinario,
};

