const postVentaLeche = require("../../controllers/ventaLeche/postVentaLeche")


const postVentaLecheHandler = async (req, res) => {
    const { precio_litro, fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_cliente } = req.body
    try {
        const response = await postVentaLeche({ precio_litro, fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_cliente })
        res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = postVentaLecheHandler