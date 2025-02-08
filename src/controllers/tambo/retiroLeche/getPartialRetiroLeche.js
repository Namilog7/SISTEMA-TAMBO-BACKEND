const { RetiroLeche } = require("../../../db");

const getPartialRetiroLeche = async () => {
    try {
        // Consulta para obtener los últimos 6 registros
        const registros = await RetiroLeche.findAll({
            order: [["createdAt", "DESC"]], // Ordenar por la fecha de creación en orden descendente
            limit: 6, // Limitar a 6 resultados
        });
        return registros;
    } catch (error) {
        console.error("Error al obtener los registros de RetiroLeche:", error);
        throw new Error("Error al obtener los registros de RetiroLeche");
    }
};

module.exports = getPartialRetiroLeche;
