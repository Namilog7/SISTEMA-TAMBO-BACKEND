const crudController = require("../../controllers/crudController");
const { Empleado } = require("../../db");

const putEmpeladoHandler = async (req, res) => {
    const putEmpleado = crudController(Empleado);
    const { id, nombre, cuit_cuil, contacto, dni, saldo, sector } = req.body;

    try {
        const response = await putEmpleado.update({ id, nombre, cuit_cuil, contacto, dni, saldo, sector });
        return res.json({
            message: "Datos actualizados",
            response,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putEmpeladoHandler;
