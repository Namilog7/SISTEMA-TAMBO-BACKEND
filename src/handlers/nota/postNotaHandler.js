/* const postNota = require("../../controllers/nota/postNota");

const postNotaHandler = async (req, res) => {
    const { descripcion, tipo, tipo_destinatario, importe, fecha_emision, id_afectado } = req.body;

    try {
        // Validaciones en el handler
        if (tipo_destinatario !== "PROVEEDOR" && tipo_destinatario !== "CLIENTE") {
            return res.status(400).json({ error: "El destinatario debe ser CLIENTE o PROVEEDOR." });
        }

        if (!["DEBITO", "CREDITO"].includes(tipo)) {
            return res.status(400).json({ error: "El tipo debe ser DEBITO o CREDITO." });
        }

        if (!id_afectado || !importe || importe <= 0) {
            return res.status(400).json({ error: "id_afectado e importe deben ser válidos." });
        }

        // Llamar al controlador para manejar la lógica de la base de datos
        const result = await postNota({
            descripcion,
            tipo,
            tipo_destinatario,
            importe,
            fecha_emision,
            id_afectado,
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error en postNotaHandler:", error);
        res.status(500).json({ error: `Error en el servidor: ${error.message}` });
    }
};

module.exports = postNotaHandler;
 */

const postNota = require("../../controllers/nota/postNota");
const postResumen = require("../../controllers/resumen/postResumen");
const { conn } = require("../../db");

const postNotaHandler = async (req, res) => {
    const { descripcion, tipo, tipo_destinatario, importe, fecha_emision, id_afectado } = req.body;
    const transaction = await conn.transaction()

    try {
        if (!["PROVEEDOR", "CLIENTE"].includes(tipo_destinatario)) {
            return res.status(400).json({ error: "El destinatario debe ser CLIENTE o PROVEEDOR." });
        }

        if (!["DEBITO", "CREDITO"].includes(tipo)) {
            return res.status(400).json({ error: "El tipo debe ser DEBITO o CREDITO." });
        }

        if (!id_afectado || importe <= 0) {
            return res.status(400).json({ error: "id_afectado e importe deben ser válidos." });
        }

        // Llamar al controlador con los datos corregidos
        const result = await postNota({
            descripcion,
            tipo,
            importe,
            fecha_emision,
            id_afectado,
            tipo_destinatario
        }, transaction);
        await transaction.commit()
        return res.status(201).json(result);
    } catch (error) {
        await transaction.rollback()
        console.error("Error en postNotaHandler:", error);
        res.status(500).json({ error: `Error en el servidor: ${error.message}` });
    }
};

module.exports = postNotaHandler;
