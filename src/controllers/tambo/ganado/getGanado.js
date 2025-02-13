const { Inseminacion } = require("../../../db");

const getInseminacion = async () => {
    try {
        const response = await Inseminacion.findAll()
        return response;
    } catch (error) {
        console.error("Error al obtener inseminaciones:", error);
        throw error;
    }
};

module.exports = getInseminacion;

