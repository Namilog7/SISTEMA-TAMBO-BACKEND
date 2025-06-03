const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'CajaBancaria', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        saldo: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                notNull: {
                    msg: "El monto es obligatorio"
                }
            }
        }
    })
};