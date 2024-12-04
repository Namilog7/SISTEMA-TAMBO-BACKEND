const postTambo = require("../../controllers/tambo/postTambo");

const postTamboHandler = async (req, res) => {
    const { dueño, localidad, contacto, id_sector } = req.body
    try {
        const response = await postTambo({ dueño, localidad, contacto, id_sector })
        if (response.message) {
            return res.status(201).json(response)
        } else
            return res.status(200).json({
                message: `El tambo de ${response.dueño} fue creado`
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = postTamboHandler