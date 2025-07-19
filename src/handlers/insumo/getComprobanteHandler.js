const { DocumentoInsumos } = require("../../db");

const getComprobanteHandler = async (req, res) => {
    const { id_sector } = req.params;
    try {
        const comprobantes = await DocumentoInsumos.findAll({
            where: { id_sector },
        });
        res.json(comprobantes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getComprobanteHandler;
