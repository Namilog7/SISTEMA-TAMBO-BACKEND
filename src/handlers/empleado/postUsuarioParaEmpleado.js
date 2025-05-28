const { Empleado, User } = require("../../db");
const bcrypt = require("bcrypt");

const postUsuarioParaEmpleado = async (req, res) => {
    const { id_empleado } = req.query;
    try {
        const empelado = await Empleado.findOne({
            where: { id: id_empleado },
        });

        if (!empelado) {
            return res.status(404).json({ error: "No se encontro el empleado con id" + id_empleado });
        }

        const email = `${empelado.nombre.split(" ")[0].toLowerCase()}@${empelado.sector.toLowerCase()}.com`;
        const pass = empelado.dni;
        const passwordHasheada = await bcrypt.hash(pass, 10);

        const usuarioCreado = await User.create({
            email,
            role: "EMPLEADO",
            password: passwordHasheada,
        });

        return res.json({ datosUsuario: { email, pass }, usuarioCreado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postUsuarioParaEmpleado;
