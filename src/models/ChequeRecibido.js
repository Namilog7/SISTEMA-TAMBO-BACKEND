const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'ChequeRecibido', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('PENDIENTE', 'ANULADO', 'COBRADO'),
            allowNull: false,
            defaultValue: "PENDIENTE"
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        origen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: true
        },
        banco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_cheque: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
};