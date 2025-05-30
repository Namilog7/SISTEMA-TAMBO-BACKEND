const { User } = require("../../db");

const deleteUsuarioEmpleadoHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await User.destroy({
            where: { id_empleado: id },
        });

        console.log("res:", resultado);

        // if (resultado === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No se encontró usuario asociado a este empleado",
        //     });
        // }

        return res.json({
            success: true,
            message: "Usuario eliminado correctamente",
            empleadoId: id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Error al eliminar el usuario",
        });
    }
};

module.exports = deleteUsuarioEmpleadoHandler;
