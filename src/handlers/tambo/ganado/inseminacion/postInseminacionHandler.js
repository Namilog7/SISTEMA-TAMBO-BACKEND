const postInseminacion = require("../../../../controllers/tambo/ganado/inseminacion/postInseminacion")

const postInseminacionHandler = async (req, res) => {
    const { inseminador, fecha, fecha_carga, hora_carga, arrayGanados, imageBase64, aclaracion } = req.body
    try {
        const response = await postInseminacion({ aclaracion, inseminador, fecha, fecha_carga, hora_carga, arrayGanados, imageBase64 })
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