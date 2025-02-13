const { Inseminacion } = require("../../../../db");

const getPartialInseminacion = async (req, res) => {
    try {
        const response = await Inseminacion.findAll({
            order: [["createdAt", "DESC"]],  // Ordenar por la columna `createdAt` en orden descendente
            limit: 15                         // Limitar a los últimos 15 registros
        });
        res.status(200).json(response);       // Devolver la respuesta al cliente
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getPartialInseminacion