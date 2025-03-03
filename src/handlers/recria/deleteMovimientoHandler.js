const { Movimiento_anotacion, Macho } = require("../../db");
const crudController = require("../../controllers/crudController");

const deleteMovimientoHandler = async (req, res) => {
    const { id } = req.params;
    const deleteMovimiento = crudController(Movimiento_anotacion);
    try {
        // modificar contador
        let movimiento = await Movimiento_anotacion.findOne({ where: { id: id } });
        let terneros = await Macho.findOne();
        if (movimiento.tipo_movimiento === "INGRESO") {
            terneros.ternero_contador = Number(terneros.ternero_contador) - Number(movimiento.terneros_afectados);
        } else if (movimiento.tipo_movimiento === "BAJA" || movimiento.tipo_movimiento === "VENTA") {
            terneros.ternero_contador = Number(terneros.ternero_contador) + Number(movimiento.terneros_afectados);
        }
        await terneros.save();

        // eliminar
        const result = await deleteMovimiento.delete(id);
        return res.json({
            result,
            terneros,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteMovimientoHandler;
