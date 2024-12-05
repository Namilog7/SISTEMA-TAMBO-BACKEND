const { Ganado } = require("../../db");
const crudController = require("../../controllers/crudController")

const getGanadoHandler = async (req, res) => {
    const getGanado = crudController(Ganado)
    try {
        const response = await getGanado.readAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getGanadoHandler