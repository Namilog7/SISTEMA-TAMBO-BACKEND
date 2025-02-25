const postCloudinary = require("../../controllers/postCloudinary");
const { Movimiento_anotacion, Macho } = require("../../db");

const postMovimientoHandler = async (req, res) => {
    const { texto, fecha, archivo, ternero_contador } = req.body
    try {
        let image
        if (archivo) {
            image = await postCloudinary(archivo, "movimientos")
        }
        if (ternero_contador) {
            const machos = await Macho.update({
                ternero_contador
            })
        }
        const movimiento = await Movimiento_anotacion.create({
            texto,
            fecha,
            archivo: image
        })
        return res.json("Creado")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postMovimientoHandler