const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlGanado",
        {
            ganadoId: {
                type: DataTypes.UUID,
                references: {
                    model: "Ganados", // Nombre de la tabla Ganado
                    key: "id", // Clave primaria de Ganado
                },
                allowNull: false,
            },
            controlVeterinarioId: {
                type: DataTypes.UUID,
                references: {
                    model: "ControlVeterinarios", // Nombre de la tabla ControlVeterinario
                    key: "id", // Clave primaria de ControlVeterinario
                },
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        }
    );
};
