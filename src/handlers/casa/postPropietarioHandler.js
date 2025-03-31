const crudController = require("../../controllers/crudController");
const { CasaPropietario } = require("../../db");

const postPropietarioHandler = async (req, res) => {
    const { nombre, localidad, contacto_1 } = req.body
    const nuevoPropietario = crudController(CasaPropietario);
    try {
        const propietario = await nuevoPropietario.create({ nombre, localidad, contacto_1 })
        res.json(propietario)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postPropietarioHandler