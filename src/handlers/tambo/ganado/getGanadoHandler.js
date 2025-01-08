const { Ganado, ControlVeterinario, Inseminacion, InseminacionGanado } = require("../../../db");
const buildQueryFilters = require("../../../controllers/buildQueryFilters");

const getGanadoHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación y filtro por id_tambo
        const offset = (page - 1) * limit; // Calcular el desplazamiento
        // Construir los filtros de búsqueda
        const searchQuery = buildQueryFilters(Ganado, req.query);
        console.log(searchQuery)
        let response;
        response = await Ganado.findAndCountAll({
            where: searchQuery,
            limit: parseInt(limit), // Limitar la cantidad de resultados por página
            offset: parseInt(offset), // Desplazamiento para la paginación
            include: [
                {
                    model: ControlVeterinario,
                    through: {
                        attributes: ["fecha"], // Atributos de la tabla intermedia
                    },
                },
                {
                    model: Inseminacion,
                    through: {
                        model: InseminacionGanado,
                        attributes: ['fecha'], // Atributos de la tabla intermedia
                    },
                    attributes: ['origen_genetica', "pajuela", "fecha", "tipo"], // Atributos específicos de Inseminacion
                },
            ],
        });

        // Verificar si se encontraron registros
        if (response.rows.length === 0) {
            return res.status(404).json({ message: "No existen registros para el id_tambo proporcionado." });
        }

        // Responder con la data paginada
        return res.status(200).json({
            totalRecords: response.count, // Total de registros encontrados
            totalPages: Math.ceil(response.count / limit), // Total de páginas
            currentPage: parseInt(page), // Página actual
            data: response.rows, // Datos de la página actual
        });
    } catch (error) {
        console.error("Error en getGanadoHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getGanadoHandler;
