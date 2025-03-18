const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Remito", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        cuit_destinatario: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        razon_social_destinatario: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rubro: {
            type: DataTypes.ENUM("TAMBO", "AGRICULTURA", "FABRICA_QUESOS"),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("PENDIENTE", "FACTURADO"),
            defaultValue: "PENDIENTE",
        }
    }, {
        timestamps: true,
    });
}
