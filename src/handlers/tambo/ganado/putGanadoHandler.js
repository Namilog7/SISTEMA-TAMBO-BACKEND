const { Ganado } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const putGanadoHandler = async (req, res) => {
    const putGanado = crudController(Ganado);
    const { id, caravana, fecha_ingreso, estado, detalles, tipo } = req.body;
    try {
        const response = await putGanado.update({ id, caravana, fecha_ingreso, estado, detalles, tipo })
        res.json({
            message: `Los datos del animal ${response.caravana} fueron actualizados`,
            response
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.mesagge })
    }
}

module.exports = putGanadoHandler