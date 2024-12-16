const getInsumo = require("../../controllers/insumo/getInsumo")


const getInsumoHandler = async (req, res) => {
    const { id } = req.params
    const id_sector = parseInt(id)
    try {
        const response = await getInsumo(id_sector);
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getInsumoHandler