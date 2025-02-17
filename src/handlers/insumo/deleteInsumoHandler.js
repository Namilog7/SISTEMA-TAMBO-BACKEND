const deleteInsumo = require("../../controllers/insumo/deleteInsumo")


const deleteInsumoHandler = async (req, res) => {
    const { id_sector, id } = req.query
    try {
        const deleteOne = await deleteInsumo({ id_sector, id })
        res.json(deleteOne)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
module.exports = deleteInsumoHandler