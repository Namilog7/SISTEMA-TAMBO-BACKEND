const getInseminacion = require("../../../../controllers/tambo/ganado/getGanado");
const paginate = require("../../../../helpers/paginate")

const getInseminacionHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const inseminacion = await getInseminacion()
        // Aplicar paginado
        const paginatedResult = paginate(inseminacion, page, limit);
        return res.json(paginatedResult)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getInseminacionHandler