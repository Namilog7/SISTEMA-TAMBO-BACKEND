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
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type: DataTypes.ENUM("ACEPTADO", "ANULADO"),
            defaultValue: "ACEPTADO"
        },
        metodo: {
            type: DataTypes.ENUM("EFECTIVO", "CHEQUE", "TRANSFERENCIA", "OTROS"),
            allowNull: false
        },
    })
};