const { Empleado } = require("../../db");
const crudController = require("../../controllers/crudController");

const deleteEmpleadoHandler = async (req, res) => {
    const { id } = req.params;
    const deleteEmpleado = crudController(Empleado);
    try {
        const empleado = await deleteEmpleado.delete(id);
        res.json({ message: `Se elimino el empleado` });
    } catch (error) {
        console.log(error);
        res.status(50).json({ error: error.message });
    }
};

module.exports = deleteEmpleadoHandler;
