const postCliente = require("../../controllers/cliente/postCliente")


const postClienteHandler = async (req, res) => {
    const { nombre_empresa, cuit_cuil, contacto_1, id_sector, saldo, localidad } = req.body
    try {
        const response = await postCliente({ nombre_empresa, cuit_cuil, contacto_1, id_sector, saldo, localidad });
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = postClienteHandler