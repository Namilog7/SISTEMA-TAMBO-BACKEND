const putInsumo = require("../../controllers/insumo/putInsumo")

const putInsumoHandler = async (req, res) => {
    const { nombre, stock, detalle, id_sector, id } = req.body
    try {
        const response = await putInsumo({ id, nombre, stock, detalle, id_sector })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putInsumoHandler