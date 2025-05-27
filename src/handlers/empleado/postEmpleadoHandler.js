const postEmpleado = require("../../controllers/empleado/postEmpleado");

const postEmpleadoHandler = async (req, res) => {
    const { nombre, cuit_cuil, contacto, dni, saldo, sector } = req.body;
    try {
        const response = await postEmpleado({ nombre, cuit_cuil, contacto, dni, saldo, sector });
        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = postEmpleadoHandler;
