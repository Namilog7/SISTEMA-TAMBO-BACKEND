const postClienteLeche = require("../../controllers/clienteLeche/postClienteLeche")


const postClienteLecheHandler = async (req, res) => {
    const { nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_tambo } = req.body
    try {
        const response = await postClienteLeche({ nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_tambo });
        return res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postClienteLecheHandler