const getInseminacion = require("../../../../controllers/tambo/ganado/getGanado");
const paginate = require("../../../../helpers/paginate")

const getInseminacionHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const inseminacion = await getInseminacion()
        // Aplicar paginado
        const paginatedResult = paginate(inseminacion, page, limit);

        // Enviar la respuesta
        res.json(paginatedResult);
        if (inseminacion.length == 0) return { message: "No hay registros" };
        res.json(inseminacion)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getInseminacionHandler