const { GastoIngreso } = require("../../db");
const crudController = require("../../controllers/crudController");

const postGastoIngresoHandler = async (req, res) => {
    const { detalle, estado, tipo, fecha, id_sector } = req.body
    const gastoIngreso = crudController(GastoIngreso)
    try {
        const newGastoIngreso = await gastoIngreso.create({ detalle, estado, tipo, fecha, id_sector });
        res.json(newGastoIngreso)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postGastoIngresoHandler