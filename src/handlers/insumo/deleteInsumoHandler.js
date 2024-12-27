const deleteInsumo = require("../../controllers/insumo/deleteInsumo")


const deleteInsumoHandler = async (req, res) => {
    const { id_sector, id } = req.body
    try {
        const deleteOne = await deleteInsumo({ id_sector, id })
        res.json({ message: `Se borro el insumo` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
module.exports = deleteInsumoHandler