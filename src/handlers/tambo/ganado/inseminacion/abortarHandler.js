const { Ganado } = require("../../../../db");

const abortarHandler = async (req, res) => {
    const { id } = req.body;
    try {
        await Ganado.update(
            { inseminado: false },
            {
                where: {
                    id
                }
            }
        );

        res.json({ message: "Se aborto la inseminacion" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = abortarHandler