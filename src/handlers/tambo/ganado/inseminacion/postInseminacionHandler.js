const postInseminacion = require("../../../../controllers/tambo/ganado/inseminacion/postInseminacion")

const postInseminacionHandler = async (req, res) => {
    const { inseminador, pajuela, origen_genetica, tipo, arrayGanados } = req.body
    try {
        const response = await postInseminacion({ inseminador, pajuela, origen_genetica, tipo, arrayGanados })
        res.json({
            message:
                `Se creo la inseminacion y se relaciono a los ganados seleccionados`,
            response
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postInseminacionHandler