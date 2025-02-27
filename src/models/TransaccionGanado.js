const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "TransaccionGanado",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            comprador: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tipo_operacion: {
                type: DataTypes.ENUM("COMPRA", "VENTA"),
                allowNull: false
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE
            },
            precio_kilo: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            monto_total: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            genero: {
                type: DataTypes.ENUM("MACHO", "HEMBRA"),
                allowNull: false
            },
            comprobante: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contacto: {
                type: DataTypes.STRING,
                allowNull: true
            },
            peso_total: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};