const deleteTambo = require("../../controllers/tambo/deleteTambo");

const deleteTamboHandler = async (req, res) => {
    const { id } = req.body
    try {
        const response = await deleteTambo({ id })
        if (response == 0) {
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