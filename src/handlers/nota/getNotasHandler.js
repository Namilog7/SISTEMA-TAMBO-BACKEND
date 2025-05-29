const { Nota } = require("../../db");

const getNotasHandler = async (req, res) => {
    try {
        const allNotas = await Nota.findAll();
        res.json(allNotas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = getNotasHandler;
