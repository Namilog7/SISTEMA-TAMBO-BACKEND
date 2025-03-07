const { Macho, Movimiento_anotacion } = require("../../db");

const getMachoHandler = async (req, res) => {
    try {
        const machos = await Macho.findOne()
        const movimientos = await Movimiento_anotacion.findAll()
        if (machos.ternero_contador === 0) return res.json({ message: "Todavia no tiene terneros" })
        return res.json({
            ternero_contador: machos.ternero_contador,
            ultimo_ingreso: machos.ultimo_ingreso,
            movimientos
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getMachoHandler;
