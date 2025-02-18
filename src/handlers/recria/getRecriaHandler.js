const { Ganado, ControlVeterinario } = require("../../db");

const getRecriaHandler = async (req, res) => {
    try {
        const ganadosRecria = await Ganado.findAll({
            where: {
                estado: "RECRIA"
            },
            include: [
                {
                    model: ControlVeterinario,
                }
            ]
        });
        if (!ganadosRecria.length) {
            return res.status(404).json({ message: "No se encontraron ganados con estado RECRIA." });
        }
        res.status(200).json(ganadosRecria);
    } catch (error) {
        console.error("Error en getRecriaHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getRecriaHandler;
