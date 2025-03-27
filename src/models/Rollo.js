const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Rollo', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
};