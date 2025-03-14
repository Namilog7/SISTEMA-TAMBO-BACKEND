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

const postNotaHandler = async (req, res) => {
    const { descripcion, tipo, tipo_destinatario, importe, fecha_emision, id_afectado } = req.body;

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

        // Determinar a qué columna debe ir el id
        const id_cliente = tipo_destinatario === "CLIENTE" ? id_afectado : null;
        const id_proveedor = tipo_destinatario === "PROVEEDOR" ? id_afectado : null;

        // funcion que registra Resumen 

        // Llamar al controlador con los datos corregidos
        const result = await postNota({
            descripcion,
            tipo,
            importe,
            fecha_emision,
            id_cliente,
            id_proveedor
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error en postNotaHandler:", error);
        res.status(500).json({ error: `Error en el servidor: ${error.message}` });
    }
};

module.exports = postNotaHandler;
