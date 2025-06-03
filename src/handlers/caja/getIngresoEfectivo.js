const { MetodoGastoIngreso } = require("../../db");

const getIngresoEfectivo = async (req, res) => {
    try {
        const ingresosEfectivo = await MetodoGastoIngreso.findAll({
            where: {
                metodo: "EFECTIVO"
            }
        });

        res.status(200).json(ingresosEfectivo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getIngresoEfectivo;
