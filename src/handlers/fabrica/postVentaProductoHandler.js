const { VentaProducto, conn } = require("../../db");
const crearBulkTablaIntermedia = require("../../helpers/crearBulkParaIntermedia");
const actualizarStock = require("../../controllers/fabrica/actualizarStock");
const postResumen = require("../../controllers/resumen/postResumen");
const postVenta = require("../../controllers/venta/postVenta");

const postVentaProductoHandler = async (req, res) => {
    const { monto, fecha, arrayObjsVenta, id_cliente, datosFacturacion, isConsumidorFinal, nombre_cliente } = req.body; //model Remito o Factura
    const transaction = await conn.transaction();
    try {
        if (!fecha || !arrayObjsVenta?.length) {
            throw new Error("Proporcione todos los datos");
        }

        //! CARGA LA VENTA Y LOS RESPECTIVOS PRODUCTOS
        const venta = await postVenta(
            { fecha, monto, id_cliente, numero: datosFacturacion.numero, nombre_cliente },
            transaction
        );

        const bulkVenta = crearBulkTablaIntermedia(arrayObjsVenta, venta.id, "id_venta");

        await VentaProducto.bulkCreate(bulkVenta);

        //! ACTUALIZA EL STOCK DE LOS PRODUCTOS
        await actualizarStock(arrayObjsVenta, transaction);

        if (!isConsumidorFinal) {
            await postResumen(
                {
                    id_afectado: id_cliente,
                    fecha,
                    detalle: `Venta ID: ${venta.id}`,
                    factura: datosFacturacion.numero,
                    model: "CLIENTE",
                    importe: monto,
                    nota_tipo: "DEBITO",
                },
                transaction
            );
        }

        res.json({
            message: "Venta registrada exitosamente",
            success: true,
            venta,
            productosVendidos: bulkVenta,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaProductoHandler;
