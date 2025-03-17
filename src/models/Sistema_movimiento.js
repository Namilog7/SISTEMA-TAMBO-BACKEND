const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Sistema_movimiento', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        ultimo_movimiento: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
};