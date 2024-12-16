const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Inseminacion",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            inseminador: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            origen: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fecha_inseminacion: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};