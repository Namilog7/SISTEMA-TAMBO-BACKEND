const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Movimiento_rollo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
        },
        texto: {
            type: DataTypes.STRING,
        },
        archivo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tipo_movimiento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};