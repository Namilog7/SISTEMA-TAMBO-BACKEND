const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'VentaProducto', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        cantidad: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    })
};