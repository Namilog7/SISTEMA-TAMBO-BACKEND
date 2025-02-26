const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "CompraLiquidacion",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            litros: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            importe_total: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            precio_litro: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            importe_blanco: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            importe_negro: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            url_image: {
                type: DataTypes.STRING
            }
        },
        { timestamps: true }
    );
};