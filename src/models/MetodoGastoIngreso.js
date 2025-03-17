const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'MetodoGastoIngreso', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        monto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        metodo: {
            type: DataTypes.ENUM("EFECTIVO", "CHEQUE", "TRANSFERENCIA", "OTROS", "CUENTA_CORRIENTE"),
            allowNull: false
        },
    })
};