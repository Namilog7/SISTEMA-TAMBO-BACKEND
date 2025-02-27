const { LoteSiembra } = require("../../db");

const putLoteHandler = async (req, res) => {
    const { nombre, hectareas, ubicacion, propiedad, id } = req.body;

    try {

        const lote = await LoteSiembra.findByPk(id);
        if (!lote) {
            return res.status(404).json({ message: "Lote no encontrado" });
        }

        await lote.update({
            nombre,
            hectareas,
            ubicacion,
            propiedad,
        });
        res.json({
            message: "Datos del Lote actualizados",
            lote
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putLoteHandler;