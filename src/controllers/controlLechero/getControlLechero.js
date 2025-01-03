const { InformeLechero, Lote, ControlLechero } = require('../../db');

const getControlLechero = async () => {
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
    return informes
}

module.exports = getControlLechero