const crudController = require("../../controllers/crudController");
const { Tambo } = require("../../db");

const deleteTamboHandler = async (req, res) => {
    const { id } = req.params
    const deleteTambo = crudController(Tambo)
    try {
        const response = await deleteTambo.delete(id)
        if (response == 0) {
            console.log(response)
            res.status(400).json({
                message: "No se encontraron los registros"
            })
        } else
            res.status(200).json({
                message: `Se eliminaron ${response} registros`
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteTamboHandler