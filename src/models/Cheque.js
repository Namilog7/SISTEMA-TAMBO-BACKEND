const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Cheque', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        importe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM("ENCARTERA", "ENTREGADO", "ANULADO"),
            allowNull: false
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
            allowNull: false
        },
        banco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_cheque: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
};