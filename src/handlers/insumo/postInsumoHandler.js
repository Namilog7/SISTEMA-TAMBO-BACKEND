const postInsumo = require("../../controllers/insumo/postInsumo")


const postInsumoHandler = async (req, res) => {
    const { nombre, stock, id_sector, ultimo_ingreso, tipo, id_proovedor, precio } = req.body
    try {
        const response = await postInsumo({ nombre, stock, id_sector, ultimo_ingreso, tipo, id_proovedor, precio })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = postInsumoHandler