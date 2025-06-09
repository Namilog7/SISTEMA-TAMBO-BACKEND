const { VentaProducto, Venta, conn, Remito, Factura } = require("../../db");
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");
const crearBulkTablaIntermedia = require("../../helpers/crearBulkParaIntermedia");
const actualizarStock = require("../../controllers/fabrica/actualizarStock");
const postCargarComprobante = require("../../controllers/caja/postCargarComprobante");
const postResumen = require("../../controllers/resumen/postResumen");
const calcularMontoMetodos = require("../../helpers/calcularMontoMetodos");
const postVenta = require("../../controllers/venta/postVenta");

const postVentaProductoHandler = async (req, res) => {
    const {
        monto,
        fecha,
        arrayObjsVenta,
        id_cliente,
        id_sector,
        metodosPago,
        tipo = "INGRESO",
        model,
        datosFacturacion,
    } = req.body; // model: Remito o Factura

    const transaction = await conn.transaction();

    try {
        if (!fecha || !arrayObjsVenta?.length) {
            throw new Error("Proporcione todos los datos");
        }

        const venta = await postVenta({ fecha, monto, id_cliente }, transaction);

        const bulkVenta = crearBulkTablaIntermedia(arrayObjsVenta, venta.id, "id_venta");

        await VentaProducto.bulkCreate(bulkVenta, { transaction });

        await actualizarStock(arrayObjsVenta, transaction);

        const montoMetodos = calcularMontoMetodos({ metodosPago });

        if (model === "REMITO") {
            await postCargarComprobante(
                { ...datosFacturacion, id_cliente, id_venta: venta.id },
                montoMetodos,
                Remito,
                transaction
            );
        }

        if (model === "FACTURA") {
            await postCargarComprobante(
                { ...datosFacturacion, id_cliente, id_venta: venta.id },
                montoMetodos,
                Factura,
                transaction
            );
        }

        const { newGastoIngreso } = await postGastoIngreso(
            {
                detalle: `Venta ID :${venta.id}`,
                tipo,
                fecha,
                id_sector,
            },
            transaction
        );

        const metodos = await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction);

        await postResumen(
            {
                id_afectado: id_cliente,
                fecha,
                detalle: `Venta ID :${venta.id}`,
                factura: datosFacturacion.numero,
                model: "CLIENTE",
                importe: monto,
            },
            transaction
        );

        await transaction.commit();

        res.json({
            message: "Venta registrada exitosamente",
            venta,
            productosVendidos: bulkVenta,
            gastoIngreso: newGastoIngreso,
            metodosPago: metodos,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaProductoHandler;
