const getPartialRecords = async (Model, limit = 14) => {
    try {
        // Consulta para obtener los últimos registros del modelo pasado
        const registros = await Model.findAll({
            order: [["createdAt", "DESC"]], // Ordenar por la fecha de creación en orden descendente
            limit, // Limitar el número de resultados
        });
        return registros;
    } catch (error) {
        console.error(`Error al obtener los registros del modelo ${Model.name}:`, error);
        throw new Error(`Error al obtener los registros del modelo ${Model.name}`);
    }
};

module.exports = getPartialRecords;
