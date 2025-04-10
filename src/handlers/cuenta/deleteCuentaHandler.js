const crudController = require("../../controllers/crudController");
const { Cuenta } = require("../../db");

const deleteCuentaHandler = async (req, res) => {
    const { id } = req.params;
    const deleteCuenta = crudController(Cuenta);
    try {
        await deleteCuenta.delete(id)
        res.json({ message: "Se elimino el registro" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteCuentaHandler