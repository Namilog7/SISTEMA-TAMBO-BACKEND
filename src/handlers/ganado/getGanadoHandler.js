const { Ganado, ControlVeterinario, Inseminacion, InseminacionGanado } = require("../../db");
const buildQueryFilters = require("../../controllers/buildQueryFilters");
const getGanado = require("../../controllers/ganado/getGanado");

const getGanadoHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación (valores por defecto)
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        // Construir los filtros de búsqueda
        const searchQuery = buildQueryFilters(Ganado, req.query);

        let response;
        if (Object.keys(req.query).length !== 0) {
            response = await Ganado.findAndCountAll({
                where: searchQuery,
                limit: parseInt(limit), // Limitar la cantidad de resultados por página
                offset: parseInt(offset), // Desplazamiento para la paginación
                include: [
                    {
                        model: ControlVeterinario,
                        through: {
                            attributes: ['fecha', 'produccion_promedio'], // Atributos de la tabla intermedia
                        },
                    },
                    {
                        model: Inseminacion,
                        through: {
                            model: InseminacionGanado,
                            attributes: ['fecha'], // Atributos de la tabla intermedia
                        },
                        attributes: ['origen'], // Atributos específicos de Inseminacion
                    },
                ],
            });

            if (response.rows.length === 0) {
                return res.status(404).json({ message: "No existen esos registros" });
            }

            return res.status(200).json({
                totalRecords: response.count, // Total de registros encontrados
                totalPages: Math.ceil(response.count / limit), // Total de páginas
                currentPage: parseInt(page), // Página actual
                data: response.rows, // Datos de la página actual
            });
        } else {
            response = await getGanado();
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error("Error en getGanadoHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getGanadoHandler;
