const { ProduccionLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const deleteGanadoHandler = async (req, res) => {
    const { id } = req.params
    const deleteProduccionLeche = crudController(ProduccionLeche)
    try {
        const response = await deleteProduccionLeche.delete(id)
        res.json({ message: `Se eliminaron ${response} regitros` })
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteGanadoHandler