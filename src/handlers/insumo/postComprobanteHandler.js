const { Comprobante } = require("../../db");
const postCloudinary = require("../../controllers/postCloudinary")

const postComprobanteHandler = async (req, res) => {
    const { detalle, fecha, image, id_sector } = req.body
    try {
        let url_image
        if (image) {
            url_image = await postCloudinary(image, "comprobantes")
        }
        const comprobante = await Comprobante.create({
            detalle,
            fecha,
            url_image,
            id_sector
        });
        res.json({
            message: "Se creo el archivo",
            comprobante
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postComprobanteHandler