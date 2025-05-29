const { CompromisoDePago } = require("../../db");
const crudController = require("../../controllers/crudController");

const deletePropietarioHandler = async (req, res) => {
    const { id } = req.params;
    const deleteCompromiso = crudController(CompromisoDePago);
    try {
        const compromiso = await deleteCompromiso.delete(id);
        res.json({ message: `Se elimino el compromiso` });
    } catch (error) {
        console.log(error);
        res.status(50).json({ error: error.message });
    }
};

module.exports = deletePropietarioHandler;
