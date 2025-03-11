const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Venta', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        monto: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
};