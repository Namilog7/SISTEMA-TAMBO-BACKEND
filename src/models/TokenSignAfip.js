const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('TokenSignAfip', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sign: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaExpiracion: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
};