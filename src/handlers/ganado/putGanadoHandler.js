const { Ganado } = require("../../db");
const crudController = require("../../controllers/crudController");

const putGanadoHandler = async (req, res) => {
    const putGanado = crudController(Ganado);
    const { id, caravana, inseminado, recria, produccionDiaria, detalles } = req.body;
    try {
        const response = await putGanado.update({ id, caravana, inseminado, recria, produccionDiaria, detalles })
        res.json({ message: `Los datos del animal ${caravana} fueron actualizados` })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = putGanadoHandler