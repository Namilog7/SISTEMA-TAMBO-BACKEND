const { TransaccionGanado, Recria, Ganado } = require("../../db");

const postCompraHandler = async (req, res) => {
    try {
        const { tipo, importe, arrayIngresos, aclaracion, usuario_carga, fecha_carga, comprador } = req.body;

        if (!tipo || !importe || !arrayIngresos || arrayIngresos.length === 0 || !usuario_carga || !fecha_carga) {
            return res.status(400).json({ message: "Todos los campos son obligatorios y debe haber al menos un ingreso." });
        }
        if (tipo !== "COMPRA") {
            return res.status(400).json({ message: "El tipo de operación debe ser COMPRA." });
        }

        // Crear la transacción en TransaccionGanado
        const transaccion = await TransaccionGanado.create({
            tipo_operacion: tipo,
            comprador: comprador,
            precio_kilo: importe / arrayIngresos.reduce((total, ingreso) => total + (ingreso.peso || 0), 0), // Precio por kilo
            monto_total: importe,
            cantidad: arrayIngresos.length,
            fecha: fecha_carga,
        });

        // Crear registros en Recria
        const recriaRecords = arrayIngresos.map((ingreso) => ({
            origen: ingreso.origen,
            caravana: ingreso.caravana,
            genero: ingreso.genero,
            peso: ingreso.peso || null,
            fecha_ingreso: ingreso.fecha_ingreso || null,
            transaccionId: transaccion.id,
        }));

        await Recria.bulkCreate(recriaRecords);

        // Filtrar solo las hembras para ingresarlas en Ganado
        const ganadoRecords = arrayIngresos
            .filter((ingreso) => ingreso.genero === "HEMBRA")
            .map((ingreso) => ({
                caravana: ingreso.caravana,
                fecha_ingreso: ingreso.fecha_ingreso || null,
                inseminado: false,
                detalles: null,
                tipo: null,
                estado: "RECRIA",
            }));

        if (ganadoRecords.length > 0) {
            await Ganado.bulkCreate(ganadoRecords);
        }

        res.status(201).json({
            message: "Transacción de compra, registros en recría y ganado (hembras) creados con éxito.",
            transaccion,
            recria: recriaRecords,
            ganado: ganadoRecords.length > 0 ? ganadoRecords : "No se crearon registros en Ganado",
        });
    } catch (error) {
        console.error("Error en postCompraHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postCompraHandler;
