const { Ingreso_recria, Recria } = require("../../db");

const getRecriaHandler = async (req, res) => {
    try {
        const recriaIngresos = await Ingreso_recria.findAll({
            include: [
                {
                    model: Recria,
                }
            ]
        });

        if (!recriaIngresos.length) {
            return res.status(404).json({ message: "No se encontraron ingresos de recría." });
        }

        const formattedResponse = recriaIngresos
            .map(ingreso =>
                ingreso.Recria.map(recria => ({
                    origen: recria.origen,
                    caravana: recria.caravana,
                    genero: recria.genero,
                    tipo_ingreso: ingreso.tipo_ingreso,
                    importe: ingreso.importe
                }))
            )
            .flat();

        res.status(200).json(formattedResponse);
    } catch (error) {
        console.error("Error en getRecriaHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getRecriaHandler;
