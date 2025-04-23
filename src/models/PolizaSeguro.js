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
            desde: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            hasta: {
                type: DataTypes.DATE,
                allowNull: false
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM("VIGENTE", "VENCIDO"),
                defaultValue: "VIGENTE"
            },
            cantidad_cuotas: {
                type: DataTypes.INTEGER,
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