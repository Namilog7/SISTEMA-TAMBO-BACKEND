const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");
const { conn } = require("../../db")

const postGastoIngresoHandler = async (req, res) => {
    const transaction = await conn.transaction()
    try {
        const { detalle, estado, tipo, fecha, id_sector, metodosPago } = req.body;

        const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector }, transaction);
        const metodos = await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)

        res.status(201).json({
            message: "Gasto/Ingreso registrado y saldo actualizado",
            gastoIngreso: newGastoIngreso,
            metodos
        });

    } catch (error) {
        await transaction.rollback()
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

module.exports = postGastoIngresoHandler;
