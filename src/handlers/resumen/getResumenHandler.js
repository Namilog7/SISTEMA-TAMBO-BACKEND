const getResumen = require("../../controllers/resumen/getResumen");

const getResumenHandler = async (req, res) => {
    const { id } = req.params
    const { tipo } = req.body
    try {
        const resumen = await getResumen({ tipo, id })
        res.json({
            resumen
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getResumenHandler