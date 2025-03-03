const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'SaldoCaja', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        saldo: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    })
};