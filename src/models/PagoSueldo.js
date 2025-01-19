const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "PagoSueldo",
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
            monto_blanco: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            monto_negro: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            datalle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            monto_total: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};