const { Inseminacion, InseminacionGanado } = require('../../../../db');

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
const postInseminacion = async ({ inseminador, arrayGanados, fecha, fecha_carga, hora_carga }) => {
    try {
        // Crear la inseminación
        const nuevaInseminacion = await Inseminacion.create({
            inseminador,
            fecha,
            fecha_carga,
            hora_carga,
        });

        // Obtener el ID de la inseminación creada
        const InseminacionId = nuevaInseminacion.id;

        // Crear las entradas en la tabla intermedia para cada id de ganado
        const ganadosInseminacion = arrayGanados.map(GanadoId => ({
            InseminacionId,
            GanadoId,
            caravana,
            pajuela,
            sexado
        }));

        // Bulk insert para la tabla intermedia
        await InseminacionGanado.bulkCreate(ganadosInseminacion);

        return {
            message: 'Inseminación creada con éxito',
            inseminacion: nuevaInseminacion,
        };
    } catch (error) {
        console.error('Error al crear la inseminación:', error.message);
        throw new Error('No se pudo crear la inseminación. Verifica los datos e inténtalo de nuevo.');
    }
};

module.exports = postInseminacion;
