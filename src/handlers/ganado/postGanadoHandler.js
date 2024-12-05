const { Ganado } = require("../../db");
const crudController = require("../../controllers/crudController")

const postGanadoHandler = async (req, res) => {
    const postGanado = crudController(Ganado)
    const { caravana, produccionDiaria, inseminado, detalles, tipo, recria } = req.body
    try {
        const response = await postGanado.create({ caravana, produccionDiaria, inseminado, detalles, tipo, recria })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postGanadoHandler