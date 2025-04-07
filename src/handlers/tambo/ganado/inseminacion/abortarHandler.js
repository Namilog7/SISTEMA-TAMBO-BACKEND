const { Ganado } = require("../../../../db");

const abortarHandler = async (req, res) => {
    const { arrayGanado } = req.body;
    try {
        await Ganado.update(
            { inseminado: false },
            {
                where: {
                    caravana: arrayGanado.map(g => g.caravana)
                }
            }
        );

        res.json({ message: "Ganados actualizados con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = abortarHandler