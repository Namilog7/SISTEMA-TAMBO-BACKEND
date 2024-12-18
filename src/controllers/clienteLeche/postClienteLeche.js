const { ClienteLeche } = require("../../db");

const postClienteLeche = async (obj) => {
    const newClienteLeche = await ClienteLeche.create(obj)
    return {
        message: "Se creo el nuevo cliente",
        newClienteLeche
    }
}

module.exports = postClienteLeche