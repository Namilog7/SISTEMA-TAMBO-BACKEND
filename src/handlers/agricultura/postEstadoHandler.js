const { EstadoSiembra } = require("../../db");

const postEstadoHandler = async (req, res) => {
    const { detalle, id_lote, fecha, estado } = req.body
    try {
        const newEstado = await EstadoSiembra.create({
            detalle,
            id_lote,
            fecha,
            estado
        })
        res.json({
            message: `Se creo el nuevo estado para el lote`,
            newEstado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postEstadoHandler