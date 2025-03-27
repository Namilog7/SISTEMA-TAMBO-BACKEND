const cambioLitros = require("../../controllers/equipoFrio/cambioLitros");
const { conn } = require("../../db");

const cambioFabricaHandler = async (req, res) => {
    const { litros } = req.body
    const transaction = await conn.transaction()
    try {
        await cambioLitros({ litros }, transaction)
        res.json({
            message: "litros cambiamos a fabrica",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = cambioFabricaHandler