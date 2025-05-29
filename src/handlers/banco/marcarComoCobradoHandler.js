const { ChequeRecibido } = require("../../db");

const marcarComoCobrado = async (req, res) => {
    const { id } = req.query;
    console.log("id:", id);
    try {
        const putCheque = await ChequeRecibido.update({ estado: "COBRADO" }, { where: { id: id } });
        res.json(putCheque);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = marcarComoCobrado;
