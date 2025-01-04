const crudController = require("../../../controllers/crudController");
const { Insmeminacion } = require("../../../db");

const getInseminacionHandler = async (req, res) => {
    try {
        const getInseminacion = crudController(Insmeminacion)
        const inseminacion = await getInseminacion.readAll()
        if (inseminacion.length == 0) return { message: "No hay registros" };
        res.json(inseminacion)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getInseminacionHandler