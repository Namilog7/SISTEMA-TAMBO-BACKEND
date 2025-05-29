const { ChequeRecibido } = require("../../db");

const deleteChequeRecibidoHandler = async (req, res) => {
    const { id } = req.query;
    try {
        const deleteCheque = await ChequeRecibido.destroy({
            where: { id },
        });

        res.json({
            message: `Se elimino el cheque`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteChequeRecibidoHandler;
