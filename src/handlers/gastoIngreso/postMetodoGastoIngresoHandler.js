const { GastoIngreso, MetodoGastoIngreso, SaldoCaja } = require("../../db");

const postMetodoGastoIngresoHandler = async (req, res) => {
    const { id_gasto_ingreso, metodo, importe } = req.body;

    try {
        if (!id_gasto_ingreso || !metodo || importe === undefined) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const importeNum = Number(importe);
        if (isNaN(importeNum) || importeNum <= 0) {
            return res.status(400).json({ message: "El importe debe ser un número válido y mayor a 0" });
        }

        const gastoIngreso = await GastoIngreso.findByPk(id_gasto_ingreso);
        if (!gastoIngreso) {
            return res.status(404).json({ message: "El gasto/ingreso no existe" });
        }

        const nuevoMetodo = await MetodoGastoIngreso.create({
            id_gasto_ingreso,
            metodo,
            importe: importeNum,
        });

        let saldoActualizado = null;

        if (metodo === "EFECTIVO") {
            let saldoCaja = await SaldoCaja.findOne();
            if (!saldoCaja) {
                saldoCaja = await SaldoCaja.create({ saldo: 0 });
            }

            if (gastoIngreso.tipo === "INGRESO") {
                saldoCaja.saldo += importeNum;
            } else if (gastoIngreso.tipo === "EGRESO") {
                saldoCaja.saldo -= importeNum;
            }

            await saldoCaja.save();
            saldoActualizado = saldoCaja.saldo;
        }

        return res.status(201).json({
            message: "Método de pago registrado",
            metodoGastoIngreso: nuevoMetodo,
            saldoActualizado: saldoActualizado !== null ? saldoActualizado : "No aplica",
        });

    } catch (error) {
        console.error("Error en postMetodoGastoIngresoHandler:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = postMetodoGastoIngresoHandler;
