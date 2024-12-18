const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlGanado",
        {
            fecha: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            produccion_promedio: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }
    );
};