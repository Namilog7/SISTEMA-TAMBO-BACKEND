const { Inseminacion } = require('../../../../db');
const postCloudinary = require("../../../postCloudinary");

/**
 * Crea una nueva inseminación y asocia los ganados especificados en la tabla intermedia.
 * 
 * @param {Object} inseminacionData - Datos de la inseminación.
 * @param {string} inseminacionData.inseminador - Nombre del inseminador.
 * @param {Array} inseminacionData.arrayGanados - Array de objetos con información de los ganados.
 * @param {string} inseminacionData.fecha - Fecha de la inseminación.
 * @param {string} inseminacionData.fecha_carga - Fecha de carga.
 * @param {string} inseminacionData.hora_carga - Hora de carga.
 * @param {string} [inseminacionData.aclaracion] - Información adicional.
 * @param {string} [inseminacionData.imagenBase64] - Imagen en formato Base64.
 * @returns {Promise<Object>} Objeto con la inseminación creada y un mensaje de éxito.
 */
const postInseminacion = async ({ inseminador, arrayGanados, fecha, fecha_carga, hora_carga, aclaracion, imagenBase64 }) => {
    try {
        // Validación de datos
        if (!inseminador || !Array.isArray(arrayGanados) || arrayGanados.length === 0) {
            throw new Error("Datos insuficientes: Se requiere un inseminador y al menos un ganado.");
        }
        let image
        console.log(imagenBase64)
        if (imagenBase64) {

            image = await postCloudinary(imagenBase64, "inseminacion");
        }
        console.log(image)
        // Preparar datos para la inserción
        let bulkInseminacion = arrayGanados.map(({ caravana, pajuela, sexado }) => ({
            inseminador,
            fecha,
            fecha_carga,
            hora_carga,
            caravana,
            pajuela,
            sexado,
            aclaracion,
            url_image: image
        }));

        // Guardar en la base de datos
        const createdRecords = await Inseminacion.bulkCreate(bulkInseminacion);

        return {
            message: 'Inseminación creada con éxito',
            totalInseminaciones: createdRecords.length
        };
    } catch (error) {
        console.error('Error al crear la inseminación:', error);
        throw new Error(`No se pudo crear la inseminación: ${error.message}`);
    }
};

module.exports = postInseminacion;
