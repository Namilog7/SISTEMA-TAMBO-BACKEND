const { LoteSiembra, EstadoSiembra } = require("../../db");

const getLoteHandler = async (req, res) => {
    try {
        const response = await LoteSiembra.findAll({
            include: [
                {
                    model: EstadoSiembra,
                }
            ]
        });
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getLoteHandler;
