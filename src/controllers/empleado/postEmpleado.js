const { Empleado } = require("../../db");

const postEmpleado = async (obj) => {
    const newEmpelado = await Empleado.create(obj);
    return {
        message: "Se creo el nuevo empleado",
        newEmpelado,
    };
};

module.exports = postEmpleado;
