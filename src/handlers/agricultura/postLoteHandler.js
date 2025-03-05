const { LoteSiembra, EstadoSiembra } = require("../../db");

const postLoteHandler = async (req, res) => {
    const { nombre, hectareas, ubicacion, propiedad, estado, fecha, detalle } = req.body;
    try {
        const newLote = await LoteSiembra.create({
            nombre,
            hectareas,
            ubicacion,
            propiedad,
        });
        const estadoLote = await EstadoSiembra.create({
            estado,
            id_lote: newLote.id,
            fecha,
            detalle,
        });
        res.json({
            message: "Se creo el Lote con su estado",
            newLote,
            estadoLote,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postLoteHandler;
