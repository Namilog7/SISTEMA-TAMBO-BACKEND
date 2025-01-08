const { Ganado } = require("../../../db");
const crudController = require("../../../controllers/crudController")

const postGanadoHandler = async (req, res) => {
    const postGanado = crudController(Ganado)
    const { caravana, fecha_ingreso, inseminado, detalles, tipo, estado } = req.body
    try {
        const response = await postGanado.create({ caravana, fecha_ingreso, inseminado, detalles, tipo, estado })
        res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = postGanadoHandler