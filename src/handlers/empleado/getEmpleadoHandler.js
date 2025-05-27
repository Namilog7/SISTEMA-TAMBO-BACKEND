const { Empleado } = require("../../db");

const getEmpleadoHandler = async (req, res) => {
    const { id_empleado } = req.query;
    try {
        let empelados;

        if (id_empleado) {
            empelados = await Empleado.findOne({
                where: { id: id_empleado },
            });
        } else {
            empelados = await Empleado.findAll();
        }

        return res.json(empelados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getEmpleadoHandler;
