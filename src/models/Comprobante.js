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
                allowNull: true
            },
            fecha: {
                type: DataTypes.STRING,
            },
            subarea: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo_comprobante: {
                type: DataTypes.STRING,
                allowNull: false
            },
            numero_factura: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total_productos: {
                type: DataTypes.INTEGER,
                default: false
            },
            total_general: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            total_tributos: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            otros_datos: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cuit: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true }
    );
};