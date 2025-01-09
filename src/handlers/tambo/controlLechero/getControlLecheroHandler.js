const getControlLechero = require("../../../controllers/tambo/controlLechero/getControlLechero");


const getInformeLecheroHandler = async (req, res) => {
    try {
        const response = await getControlLechero()
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener los informes lecheros:', error);
        return res.status(500).json({ message: 'Error al obtener los informes lecheros', error });
    }
};

module.exports = getInformeLecheroHandler;
