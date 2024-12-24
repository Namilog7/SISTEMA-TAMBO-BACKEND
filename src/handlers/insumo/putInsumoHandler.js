const putInsumo = require("../../controllers/insumo/putInsumo")

const putInsumoHandler = async (req, res) => {
    const { nombre, stock, id_sector, id, precio, ultimo_ingreso, tipo } = req.body
    try {
        const response = await putInsumo({ id, nombre, stock, ultimo_ingreso, id_sector, precio, tipo })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putInsumoHandler