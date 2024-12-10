const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlGanado",
        {
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        { timestamps: false }
    );
};