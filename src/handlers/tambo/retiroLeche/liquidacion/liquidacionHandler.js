const postLiquidacion = require("../../../../controllers/tambo/retiroLeche/liquidacion/postLiquidacion");


const liquidacionHandler = async (req, res) => {
    const { arrayIdRetiros, precio_litro, fecha, litros, importe_total, importe_blanco, importe_negro } = req.body
    try {
        const liquidacion = await postLiquidacion({ arrayIdRetiros, precio_litro, fecha, litros, importe_total, importe_blanco, importe_negro });
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