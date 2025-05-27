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
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            numero_poliza: {
                type: DataTypes.STRING,
            },
            seccion: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            desde: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            hasta: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            estado: {
                type: DataTypes.ENUM("VIGENTE", "VENCIDA"),
                defaultValue: "VIGENTE",
            },
            cantidad_cuotas: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            foto_factura: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            afectados: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
