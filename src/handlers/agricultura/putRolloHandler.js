const crudController = require("../../controllers/crudController");
const { Rollo } = require("../../db");

const putRolloHandler = async (req, res) => {
    const { nombre, cantidad, precio, id } = req.body
    const rollos = crudController(Rollo);

    try {
        await rollos.update({ nombre, cantidad, precio, id })
        res.json({
            message: "Datos actualizados"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = putRolloHandler