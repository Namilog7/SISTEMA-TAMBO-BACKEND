const { GastoIngreso, SaldoCaja } = require("../../db");
const crudController = require("../../controllers/crudController");

const postGastoIngresoHandler = async (req, res) => {
    const { detalle, estado, tipo, fecha, id_sector } = req.body;
    const gastoIngreso = crudController(GastoIngreso);

    try {
        const montoNum = Number(monto);
        if (isNaN(montoNum) || montoNum <= 0) {
            return res.status(400).json({ message: "El monto debe ser un número válido y mayor a 0" });
        }

        const newGastoIngreso = await gastoIngreso.create({ detalle, estado, tipo, fecha, id_sector });

        let saldoCaja = await SaldoCaja.findOne();
        if (!saldoCaja) {
            saldoCaja = await SaldoCaja.create({ saldo: 0 });
        }

        if (tipo === "INGRESO") {
            saldoCaja.saldo += montoNum;
        } else if (tipo === "EGRESO") {
            saldoCaja.saldo -= montoNum;
        } else {
            return res.status(400).json({ message: "El tipo debe ser 'INGRESO' o 'EGRESO'" });
        }

        await saldoCaja.save();
        await

            res.status(201).json({
                message: "Gasto/Ingreso registrado y saldo actualizado",
                gastoIngreso: newGastoIngreso,
                saldoActual: saldoCaja.saldo,
            });

    } catch (error) {
        console.error("Error en postGastoIngresoHandler:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = postGastoIngresoHandler;
