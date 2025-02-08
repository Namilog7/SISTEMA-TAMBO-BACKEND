const { Tambo } = require("../../db");
const crudController = require("../../controllers/crudController");

const putTamboHandler = async (req, res) => {
    const { id, dueño, localidad, contacto } = req.body
    const updateTambo = crudController(Tambo)
    try {
        const response = await updateTambo.update({ id, dueño, localidad, contacto })
        res.status(201).json({ response })
    } catch (error) {
        console.log(error)
    }
}

module.exports = putTamboHandler