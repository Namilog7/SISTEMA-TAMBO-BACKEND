const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");

const postGastoIngresoHandler = async (req, res) => {
    try {
        const { detalle, estado, tipo, fecha, id_sector, monto } = req.body;

        const { newGastoIngreso, saldoActual } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector, monto });

        res.status(201).json({
            message: "Gasto/Ingreso registrado y saldo actualizado",
            gastoIngreso: newGastoIngreso,
            saldoActual
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = postGastoIngresoHandler;
