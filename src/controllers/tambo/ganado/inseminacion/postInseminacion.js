const { Inseminacion } = require('../../../../db');

/**
 * Crea una nueva inseminación y asocia los ganados especificados en la tabla intermedia.
 * 
 * @param {Object} inseminacionData - Datos de la inseminación.
 * @param {string} inseminacionData.inseminador - Nombre del inseminador.
 * @param {string} inseminacionData.pajuela - Código de la pajuela.
 * @param {string} inseminacionData.origen_genetica - Origen de la genética.
 * @param {string} inseminacionData.tipo - Tipo de inseminación.
 * @param {number[]} inseminacionData.arrayGanados - IDs de los ganados a asociar.
 * @returns {Promise<Object>} Objeto con la inseminación creada y un mensaje de éxito.
 */
const postInseminacion = async ({ inseminador, arrayGanados, fecha, fecha_carga, hora_carga, aclaracion }) => {
    try {
        let bulkInseminacion = arrayGanados.map((ganado) => {
            return {
                inseminador,
                fecha,
                fecha_carga,
                hora_carga,
                caravana: ganado.caravana,
                pajuela: ganado.pajuela,
                sexado: ganado.sexado,
                aclaracion
            }
        })
        await Inseminacion.bulkCreate(bulkInseminacion);

        return {
            message: 'Inseminación creada con éxito'
        };
    } catch (error) {
        console.error('Error al crear la inseminación:', error.message);
        throw new Error('No se pudo crear la inseminación. Verifica los datos e inténtalo de nuevo.');
    }
};

module.exports = postInseminacion;
