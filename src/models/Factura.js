const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Factura", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM("A", "B", "C"),
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        fecha_emision: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        condicion_venta: {
            type: DataTypes.ENUM("CONTADO", "CREDITO"),
            allowNull: false,
        },
        cuit_emisor: {
            type: DataTypes.STRING(11),
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [11, 11],
            },
        },
        razon_social_emisor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rubro: {
            type: DataTypes.ENUM("TAMBO", "AGRICULTURA", "FABRICA_QUESOS"),
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        iva: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
            defaultValue: 0.0,
        },
        retenciones: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
            defaultValue: 0.0,
        },
        total: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
}
