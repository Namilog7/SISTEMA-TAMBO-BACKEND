const { InformeLechero, Lote, ControlLechero } = require('../../db');

const getInformeLecheroHandler = async (req, res) => {
    try {
        const informes = await InformeLechero.findAll({
            include: [
                {
                    model: Lote,
                    include: [
                        {
                            model: ControlLechero,
                        }
                    ]
                }
            ]
        });

        return res.status(200).json(informes);
    } catch (error) {
        console.error('Error al obtener los informes lecheros:', error);
        return res.status(500).json({ message: 'Error al obtener los informes lecheros', error });
    }
};

module.exports = getInformeLecheroHandler;
