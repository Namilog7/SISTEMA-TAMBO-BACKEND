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
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('ENTREGADO', 'ANULADO', 'PAGADO'),
            allowNull: false
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: true
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