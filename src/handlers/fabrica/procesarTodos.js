const { conn } = require("../../db");
const actualizarFabrica = require("../../controllers/fabrica/actualizarFabrica");

const procesarTodos = async (req, res) => {
    const transaction = await conn.transaction();

    try {
        const { arrayProducto } = req.body;

        for (const prod of arrayProducto) {
            await actualizarFabrica(prod, transaction);
        }

        await transaction.commit();
        res.status(200).json({ message: "Fábrica actualizada correctamente" });

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = procesarTodos
