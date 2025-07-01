const actualizarFabrica = require("../../controllers/fabrica/actualizarFabrica");
const { conn } = require("../../db")

const actualizarFabricaHandler = async (req, res) => {
    // {id, cantidad, litros_variedad, masa_sin_elaborar}
    const { id, cantidad, variedad, masa_sin_elaborar } = req.body
    const transaction = await conn.transaction()
    try {
        await actualizarFabrica({ id, cantidad, variedad, masa_sin_elaborar }, transaction)
        await transaction.commit()
        res.json({ message: "Se actualizo con exito" })
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = actualizarFabricaHandler