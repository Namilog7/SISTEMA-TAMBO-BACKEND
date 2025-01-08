const crudController = require("../../../../controllers/crudController");
const { Liquidacion } = require("../../../../db");


const getLiquidacionHandler = async (req, res) => {
    const getLiquidacion = crudController(Liquidacion)
    try {
        const liquidaciones = await getLiquidacion.readAll()
        return res.json({
            liquidaciones
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error}` })
    }
}

module.exports = getLiquidacionHandler