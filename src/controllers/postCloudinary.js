const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postCloudinary = async (base64Image, folderName) => {
    try {
        if (!base64Image.startsWith("data:image/")) {
            base64Image = `data:image/jpeg;base64,${base64Image}`;
        }
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: folderName,
        });

        // Retorna la URL pública
        return result.secure_url;
    } catch (error) {
        console.error("Error subiendo la imagen a Cloudinary:", error);
        throw new Error("No se pudo subir la imagen");
    }
};

module.exports = postCloudinary;
