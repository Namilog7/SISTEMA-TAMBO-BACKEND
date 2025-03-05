const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'EstadoSiembra', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
};