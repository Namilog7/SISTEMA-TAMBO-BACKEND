const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Comprobante",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha: {
                type: DataTypes.STRING,
            },
            subarea: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tipo_comprobante: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            numero_factura: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            total_productos: {
                type: DataTypes.FLOAT,
                default: false,
            },
            total_general: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            total_tributos: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            otros_datos: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cuit: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            razon_social: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        { timestamps: true }
    );
};
