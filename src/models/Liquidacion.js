const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Liquidacion",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            cantidad: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            precio_litro: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        { timestamps: true }
    );
};