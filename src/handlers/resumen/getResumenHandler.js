const ResumenCuenta = require("../../db");

const getResumenHandler = async (req, res) => {
    const { id } = req.params
    try {
        const resumen = await ResumenCuenta.findAll({
            where: {
                id: id
            }
        })
        res.json({
            resumen
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getResumenHandler