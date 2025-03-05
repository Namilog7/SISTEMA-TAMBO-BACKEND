const bcrypt = require("bcrypt");
const { User } = require("../../../db");

const putEmpleadoHandler = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
        }

        const { id } = req.params;
        const { email, role, password, nombre, apellido, localidad, contacto, dni, cuit_cuil } = req.body;

        const empleado = await User.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado." });
        }

        let passwordHasheada = empleado.password;
        if (password) {
            if (password.length < 5) {
                return res.status(400).json({ message: "La contraseña debe tener al menos 5 caracteres." });
            }
            passwordHasheada = await bcrypt.hash(password, 10);
        }

        await empleado.update({
            email: email || empleado.email,
            role: role || empleado.role,
            password: passwordHasheada,
            nombre: nombre || empleado.nombre,
            apellido: apellido || empleado.apellido,
            localidad: localidad || empleado.localidad,
            contacto: contacto || empleado.contacto,
            dni: dni || empleado.dni,
            cuit_cuil: cuit_cuil || empleado.cuit_cuil
        });

        res.status(200).json({
            message: "Empleado actualizado con éxito.",
            empleado: {
                id: empleado.id,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                email: empleado.email,
                role: empleado.role,
            },
        });
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = putEmpleadoHandler;
