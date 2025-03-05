const { LoteSiembra, EstadoSiembra } = require("../../db");

const getLoteHandler = async (req, res) => {
    const { id } = req.params
    try {
        let response
        if (id) {
            response = await LoteSiembra.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: EstadoSiembra
                }]
            })
        } else {
            response = await LoteSiembra.findAll({
                include: [
                    {
                        model: EstadoSiembra,
                    }
                ]
            });
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getLoteHandler;
