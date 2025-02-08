const postInseminacion = require("../../../../controllers/tambo/ganado/inseminacion/postInseminacion")

const postInseminacionHandler = async (req, res) => {
    const { inseminador, fecha, fecha_carga, hora_carga, arrayGanados } = req.body
    try {
        const response = await postInseminacion({ inseminador, fecha, fecha_carga, hora_carga, arrayGanados })
        // cambiar handler
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