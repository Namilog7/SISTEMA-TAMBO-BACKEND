const { LoteSiembra } = require("../../db");

const deleteLoteHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteLote = await LoteSiembra.destroy({
            where: { id }
        });
        res.json({
            message: `Se eliminaron ${deleteLote} Lotes`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteLoteHandler