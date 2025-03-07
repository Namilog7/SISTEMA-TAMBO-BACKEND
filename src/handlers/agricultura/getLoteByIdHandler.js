const { LoteSiembra, EstadoSiembra } = require("../../db");
const getLoteByIdHandler = async (req, res) => {
    const { id } = req.params
    try {
        const response = await LoteSiembra.findOne({
            where: { id },
            include: [{
                model: EstadoSiembra
            }]
        })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getLoteByIdHandler