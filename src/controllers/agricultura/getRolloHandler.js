const { Rollo } = require("../../db");
const crudController = require("../../controllers/crudController");

const getRolloHandler = async (req, res) => {
    const getRollo = crudController(Rollo);

    try {
        const allRollos = await getRollo.readAll()
        res.json(allRollos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getRolloHandler