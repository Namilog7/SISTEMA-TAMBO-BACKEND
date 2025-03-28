const { conn } = require("../../db");
const postMovimientoRollo = require("../../controllers/agricultura/postMovimientoRollo");
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");
const postVenta = require("../../controllers/venta/postVenta")


const postVentaRolloHandler = async (req, res) => {
    const { comprador, importe, fecha, rollos_afectados, metodosPago, detalle, id_sector, tipo, estado } = req.body
    const transaction = await conn.transaction()
    try {

        const { nuevoGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector }, transaction);
        const id_gasto_ingreso = nuevoGastoIngreso.id
        let allMetodos = await registrarMetodosPago(id_gasto_ingreso, metodosPago, transaction)

        const movimiento = await postMovimientoRollo({
            rollos_afectados,
            tipo_movimiento: "VENTA",
            archivo
        }, transaction)

        await postVenta({ id_cliente: comprador, monto: importe, fecha }, transaction)

        await transaction.commit()
        res.json({
            allMetodos,
            movimiento
        })
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = postVentaRolloHandler