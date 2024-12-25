const postLiquidacion = require("../../controllers/liquidacion/postLiquidacion");


const liquidacionHandler = async (req, res) => {
    const { arrayIdRetiros, precio_litro, fecha } = req.body
    try {
        const liquidacion = await postLiquidacion({ arrayIdRetiros, precio_litro, fecha });
        return res.json({
            message: `Se creo la liquidacion`,
            liquidacion
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}

module.exports = liquidacionHandler