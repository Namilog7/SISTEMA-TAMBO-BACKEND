const putInsumo = require("../../controllers/insumo/putInsumo")

const putInsumoHandler = async (req, res) => {
    const { nombre, stock, id_sector, id, precio, ultimo_ingreso, tipo, id_proveedor } = req.body
    try {
        const response = await putInsumo({ id, nombre, stock, ultimo_ingreso, id_sector, precio, tipo, id_proveedor })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = putInsumoHandler