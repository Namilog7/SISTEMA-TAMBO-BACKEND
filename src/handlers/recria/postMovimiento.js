const postCloudinary = require("../../controllers/postCloudinary");
const { Movimiento_anotacion, Macho } = require("../../db");

const postMovimientoHandler = async (req, res) => {
    const { texto, fecha, archivo, ternero_contador, tipo_movimiento } = req.body;
    try {
        let image;
        if (archivo) {
            image = await postCloudinary(archivo, "movimientos");
        }
        let terneros = await Macho.findOne();
        if (tipo_movimiento === "BAJA") {
            terneros.ternero_contador = Number(terneros.ternero_contador) - Number(ternero_contador);
        }
        if (tipo_movimiento === "INGRESO") {
            terneros.ternero_contador = Number(terneros.ternero_contador) + Number(ternero_contador);
        }
        await terneros.save();
        const movimiento = await Movimiento_anotacion.create({
            texto,
            fecha,
            archivo: image,
            terneros_afectados: ternero_contador,
            tipo_movimiento: tipo_movimiento,
        });
        return res.json({
            message: "Creado con exito",
            ternero_contador: terneros.ternero_contador,
            movimiento,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postMovimientoHandler;
