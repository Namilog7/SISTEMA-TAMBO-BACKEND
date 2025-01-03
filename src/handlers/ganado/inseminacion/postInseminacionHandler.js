
const postInseminacionHandler = async (req, res) => {
    const { inseminador, pajuela, origen_genetica, tipo, arrayGanados } = req.body
    try {
        const response = await postInseminacionHandler()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postInseminacionHandler