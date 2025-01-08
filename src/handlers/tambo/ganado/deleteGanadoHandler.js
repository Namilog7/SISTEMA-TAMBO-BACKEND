const { Ganado } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const deleteGanadoHandler = async (req, res) => {
    const { id } = req.params
    const deleteGanado = crudController(Ganado)
    try {
        const response = await deleteGanado.delete(id)
        res.json({ message: `Se eliminaron ${response} regitros` })
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteGanadoHandler