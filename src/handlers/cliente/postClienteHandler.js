const postCliente = require("../../controllers/cliente/postCliente")


const postClienteHandler = async (req, res) => {
    const { nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_sector, numero_cuenta, saldo } = req.body
    try {
        const response = await postCliente({ nombre_empresa, propietario, cuit_cuil, contacto_1, contacto_2, id_sector, saldo, numero_cuenta });
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = postClienteHandler