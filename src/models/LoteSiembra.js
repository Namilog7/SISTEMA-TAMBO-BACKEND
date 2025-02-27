const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'LoteSiembra', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hectareas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        propiedad: {
            type: DataTypes.STRING
        }
    })
};