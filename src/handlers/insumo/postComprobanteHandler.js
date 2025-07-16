const { DocumentoInsumos } = require("../../db");
const postCloudinary = require("../../controllers/postCloudinary");

const postComprobanteHandler = async (req, res) => {
    const { detalle, fecha, image, id_sector } = req.body;
    try {
        let url_image;
        if (image) {
            url_image = await postCloudinary(image, "comprobantes");
        }
        if (!id_sector) throw new Error("Debe mandar el id_sector");
        const comprobante = await DocumentoInsumos.create({
            detalle,
            fecha,
            url: url_image,
            id_sector,
        });
        res.json({
            message: "Se creo el archivo",
            comprobante,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postComprobanteHandler;
