const getVentaLeche = require("../../controllers/ventaLeche/getVentaLeche");


const getVentaLecheHandler = async (req, res) => {
    const { id } = req.params;
    const id_tambo = parseInt(id);
    try {
        const response = await getVentaLeche(id_tambo)
        if (response.length == 0) {
            return res.json({ message: "No hay registros" })
        }
        res.json(response)

    } catch (error) {
        console.log(error)
    }
}

module.exports = getVentaLecheHandler
