const putTambo = require("../../controllers/tambo/putTambo");

const putTamboHandler = async (req, res) => {
    const { id, dueño, localidad, contacto } = req.body
    try {
        const response = await putTambo({ id, dueño, localidad, contacto })
        res.status(201).json({ response })
    } catch (error) {
        console.log(error)
    }
}

module.exports = putTamboHandler