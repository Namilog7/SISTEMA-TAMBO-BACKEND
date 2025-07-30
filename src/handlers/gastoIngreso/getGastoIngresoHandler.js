const { GastoIngreso, MetodoGastoIngreso } = require("../../db");

const getGastoIngresoHandler = async (req, res) => {
    const { id } = req.query;
    try {
        const options = {
            include: {
                model: MetodoGastoIngreso,
                attributes: ['monto']
            }
        };

        let result;
        if (id) {
            result = await GastoIngreso.findByPk(id, options);
        } else {
            result = await GastoIngreso.findAll(options);
        }

        const response = Array.isArray(result)
            ? result.map(item => ({
                ...item.toJSON(),
                importe: item.MetodoGastoIngreso?.monto
            }))
            : {
                ...result.toJSON(),
                importe: result.MetodoGastoIngreso?.monto
            };

        res.json(response);

    } catch (error) {
        console.error("Error al obtener gastos/ingresos:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getGastoIngresoHandler;