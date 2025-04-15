const { CasaPropietario } = require("../../db");
const crudController = require("../../controllers/crudController")

const putPropietarioHandler = async (req, res) => {
    const { nombre, localidad, contacto_1, id } = req.body
    const updatePropietario = crudController(CasaPropietario);

    try {
        const update = await updatePropietario.update({ nombre, localidad, contacto_1, id })
        res.json(update)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = putPropietarioHandler