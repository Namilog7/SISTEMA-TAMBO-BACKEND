const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "GastoIngreso",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            tipo: {
                type: DataTypes.ENUM("EGRESO", "INGRESO"),
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM("ACEPTADO", "ANULADO"),
                allowNull: false,
                defaultValue: "ACEPTADO"
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            motivo: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true }
    );
};