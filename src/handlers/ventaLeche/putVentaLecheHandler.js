const crudController = require("../../controllers/crudController");
const { VentaLeche } = require("../../db")

const putVentaLecheHandler = async (req, res) => {
    const putVentaLeche = crudController(VentaLeche, req.query);
    const { id, fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_cliente } = req.body
    try {
        const response = await putVentaLeche.update({ id, fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_cliente });
        res.json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = putVentaLecheHandler