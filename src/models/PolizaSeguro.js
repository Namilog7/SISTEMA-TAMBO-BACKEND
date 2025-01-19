const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "PolizaSeguro",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            foto_factura: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};