const postLiquidacion = require("../../../../controllers/tambo/retiroLeche/liquidacion/postLiquidacion");
const { conn } = require("../../../../db");


const liquidacionHandler = async (req, res) => {
    const {
        arrayIdRetiros,
        precio_litro,
        fecha,
        litros,
        importe_total,
        importe_blanco,
        importe_negro,
        imagenBase64,
        detalle = "",
        id_sector,
        tipo = "INGRESO",
        estado = "ACTIVO",
        metodosPago,
    } = req.body
    const transaction = await conn.transaction()
    try {
        const liquidacion = await postLiquidacion({
            arrayIdRetiros,
            precio_litro,
            fecha,
            litros,
            importe_total,
            importe_blanco,
            importe_negro,
            imagenBase64,
            detalle,
            id_sector,
            tipo,
            estado,
            metodosPago,
            transaction
        });
        return res.json({
            liquidacion
        })
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        res.status(500).json({ error: `Hubo un problema en el servidor: ${error.message}` })
    }
}
module.exports = liquidacionHandler