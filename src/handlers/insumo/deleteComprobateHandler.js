const crudController = require("../../controllers/crudController");
const { Comprobante } = require("../../db")

const deleteComprobanteHandler = async (req, res) => {
    const { id_comprobate } = req.params
    const deleteComprobante = crudController(Comprobante);
    try {
        const comprobanteDelete = await deleteComprobante.delete(id_comprobate);
        res.json({
            comprobanteDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteComprobanteHandler