const { CasaPropietario } = require("../../db");
const crudController = require("../../controllers/crudController");

const deletePropietarioHandler = async (req, res) => {
    const { id } = req.params;
    const deletePropietario = crudController(CasaPropietario)
    try {
        const propietarioDelete = await deletePropietario.delete(id)
        res.json({ message: `Se elimino ${propietarioDelete} registro` })
    } catch (error) {
        console.log(error);
        res.status(50).json({ error: error.message })
    }
}

module.exports = deletePropietarioHandler