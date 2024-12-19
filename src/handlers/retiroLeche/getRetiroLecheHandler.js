const { RetiroLeche } = require("../../db");
const buildQueryFilters = require("../../controllers/buildQueryFilters");

const getRetiroLecheHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación y filtro por id_tambo
        const offset = (page - 1) * limit; // Calcular el desplazamiento
        const searchQuery = buildQueryFilters(RetiroLeche, req.query)
        let response
        response = await RetiroLeche.findAndCountAll({
            where: searchQuery,
            limit: parseInt(limit), // Limitar la cantidad de resultados por página
            offset: parseInt(offset), // Desplazamiento para la paginación
        });

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "No existen registros." });
        }

        // Responder con la data paginada
        return res.status(200).json({
            totalRecords: response.count, // Total de registros encontrados
            totalPages: Math.ceil(response.count / limit), // Total de páginas
            currentPage: parseInt(page), // Página actual
            data: response.rows, // Datos de la página actual
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = getRetiroLecheHandler