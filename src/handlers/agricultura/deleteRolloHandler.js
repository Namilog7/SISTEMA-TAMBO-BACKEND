const crudController = require("../../controllers/crudController");
const { Rollo } = require("../../db");

const deleteRolloHandler = async (req, res) => {
    const { id } = req.params
    const deleteRollo = crudController(Rollo);

    try {
        await deleteRollo.delete(id);
        res.json({ message: "Se elimino el registro" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteRolloHandler