const resumenCaja = require("../../controllers/caja/resumenCaja");

const postResumenHandler = async (req, res) => {
    const { tipo, detalle, fecha, importe, arrayMetodo } = req.body
    try {
        const resumen = await resumenCaja({ tipo, detalle, fecha, importe, arrayMetodo });
        res.json({
            message: "Creado el nuevo resumen",
            resumen
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postResumenHandler