const { Movimiento_anotacion, Macho } = require("../../db");
const crudController = require("../../controllers/crudController");

const deleteMovimientoHandler = async (req, res) => {
    const { id } = req.params;
    const deleteMovimiento = crudController(Movimiento_anotacion);
    let terneros = await Macho.findOne();
    try {
        // modificar contador
        const movimiento = await deleteMovimiento.readOne(id);
        if (movimiento.tipo_movimiento === "INGRESO") {
            terneros.ternero_contador = Number(terneros.ternero_contador) - Number(ternero_contador);
        } else if (movimiento.tipo_movimiento === "BAJA") {
            terneros.ternero_contador = Number(terneros.ternero_contador) + Number(ternero_contador);
        }
        await terneros.save();

        // eliminar
        const result = await deleteMovimiento.delete(id);
        return res.json({
            result,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteMovimientoHandler;
