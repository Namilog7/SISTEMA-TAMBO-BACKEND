const postInsumo = require("../../controllers/insumo/postInsumo")


const postInsumoHandler = async (req, res) => {
    const { nombre, stock, detalle, id_sector } = req.body
    try {
        const response = await postInsumo({ nombre, stock, detalle, id_sector })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postInsumoHandler