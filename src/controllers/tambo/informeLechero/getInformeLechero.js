const { InformeLechero, ControlLechero } = require('../../../db');

const getInformeLechero = async () => {
    try {
        const informes = await InformeLechero.findAll({
            include: [
                {
                    model: ControlLechero,
                    attributes: ['litros_ordeñe1', 'litros_ordeñe2', 'total', 'observacion', 'lote'],
                },
            ],
            attributes: [
                'id',
                'litros_tanque',
                'litros_medidos',
                'total_vacas_ordeñe',
                'promedio_tambo',
                'litros_lote1',
                'litros_lote2',
                'hora_inicio_ordeñe1_lote1',
                'hora_fin_ordeñe1_lote1',
                'hora_inicio_ordeñe1_lote2',
                'hora_fin_ordeñe1_lote2',
                'hora_inicio_ordeñe2_lote1',
                'hora_fin_ordeñe2_lote1',
                'hora_inicio_ordeñe2_lote2',
                'hora_fin_ordeñe2_lote2',
                'hora_carga',
            ],
        });

        return ({ success: true, data: informes });
    } catch (error) {
        console.error(error);
        return ({ success: false, message: 'Error al obtener los informes lecheros', error });
    }
};

module.exports = getInformeLechero;
