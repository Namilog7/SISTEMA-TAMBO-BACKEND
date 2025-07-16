const crudController = require("../../controllers/crudController");
const { DocumentoInsumos } = require("../../db");

const deleteComprobanteHandler = async (req, res) => {
    const { id_comprobante } = req.params;
    const deleteComprobante = crudController(DocumentoInsumos);
    try {
        const comprobanteDelete = await deleteComprobante.delete(id_comprobante);
        res.json({
            comprobanteDelete,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteComprobanteHandler;
