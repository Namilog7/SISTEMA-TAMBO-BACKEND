const { ProduccionLeche } = require("../../../db");
const { Op, Sequelize } = require("sequelize");

const getEstadisticasHandler = async (req, res) => {
    const { year } = req.query;

    try {
        if (!year || isNaN(year) || year.length !== 4) {
            return res.status(400).json({ error: "Debe proporcionar un año válido." });
        }

        const estadisticas = await ProduccionLeche.findAll({
            attributes: [
                [Sequelize.fn("DATE_PART", "month", Sequelize.col("fecha")), "mes"],
                [Sequelize.fn("SUM", Sequelize.col("litros")), "totalLitros"],
            ],
            where: {
                fecha: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`],
                },
                estado: "ACTIVO", // Filtrar solo registros activos
            },
            group: ["mes"],
            order: [[Sequelize.fn("DATE_PART", "month", Sequelize.col("fecha")), "ASC"]],
        });

        const resultado = estadisticas.map((entry) => ({
            mes: parseInt(entry.get("mes")), // Convertir el mes a entero
            totalLitros: parseFloat(entry.get("totalLitros")),
        }));

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en getEstadisticasHandler:", error.message);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

module.exports = getEstadisticasHandler;
