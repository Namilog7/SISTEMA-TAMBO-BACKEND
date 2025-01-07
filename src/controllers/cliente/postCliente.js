const { Cliente } = require("../../db");

const postCliente = async (obj) => {
    const newCliente = await Cliente.create(obj)
    return {
        message: "Se creo el nuevo cliente",
        newCliente
    }
}

module.exports = postCliente