const { Inseminacion, Ganado } = require('../../../../db');
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
const postInseminacion = async ({ inseminador, arrayGanados, fecha, fecha_carga, hora_carga, aclaracion, imageBase64 }) => {
    try {
        // Validación de datos
        if (!inseminador || !Array.isArray(arrayGanados) || arrayGanados.length === 0) {
            throw new Error("Datos insuficientes: Se requiere un inseminador y al menos un ganado.");
        }
        let image
        console.log(imageBase64)
        if (imageBase64) {

            image = await postCloudinary(imageBase64, "inseminacion");
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

        const createdRecords = await Inseminacion.bulkCreate(bulkInseminacion);

        const caravanas = arrayGanados.map(g => g.caravana);
        await Ganado.update(
            {
                inseminado: true,
                fecha_inseminado: new Date()
            },
            { where: { caravana: caravanas } }
        );
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
