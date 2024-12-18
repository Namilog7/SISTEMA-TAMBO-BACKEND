const postVentaLeche = require("../../controllers/ventaLeche/postVentaLeche")


const postVentaLecheHandler = async (req, res) => {
    const { fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_tambo, id_cliente } = req.body
    try {
        const response = await postVentaLeche({ fecha, hora_retiro, hora_carga, litros, aclaracion, encargado_retiro, patente_camion, usuario_carga, id_tambo, id_cliente })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postVentaLecheHandler