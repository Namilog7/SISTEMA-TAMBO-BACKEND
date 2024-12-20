const crudController = require("../../controllers/crudController");
const { ClienteLeche } = require("../../db");

const putClienteLecheHandler = async (req, res) => {
    const putClienteLeche = crudController(ClienteLeche);

    try {
        const response = await putClienteLeche(ClienteLeche);
        return res.json({
            message: "Datos actualizados",
            response
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = putClienteLecheHandler