const crudController = require("../../controllers/crudController");
const { Tambo } = require("../../db");

const postTamboHandler = async (req, res) => {
    const { dueño, localidad, contacto, id_sector } = req.body
    const tamboCrud = crudController(Tambo)
    try {
        const response = await tamboCrud.create({ dueño, localidad, contacto, id_sector })
        if (response.dueño == undefined) {
            return res.status(400).json({ message: "Este registro ya existe" })
        } else
            return res.status(200).json({
                message: `El tambo de ${response.dueño} fue creado`
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = postTamboHandler