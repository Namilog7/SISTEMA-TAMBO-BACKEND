const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Liquidacion",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            importe: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { timestamps: true }
    );
};