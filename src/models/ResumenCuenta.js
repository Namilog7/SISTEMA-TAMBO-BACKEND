const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'ResumenCuenta', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        debe: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        haber: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        }
    })
};