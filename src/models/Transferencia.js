const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Transferencia', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        //tipo : credito, debito, interno : credito suma , debito resta, interno cambia entre cuentas pero no en saldo general
        tipo: {
            type: DataTypes.ENUM("CREDITO", "DEBITO", "INTERNO")
        },
        estado: {
            type: DataTypes.ENUM("ANULADA", "ACEPTADA"),
            allowNull: false
        },
        cuenta_origen: {
            type: DataTypes.STRING,
        },
        cuenta_destino: {
            type: DataTypes.STRING
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
        // id_origen, id_destino: no obligatorios
    })
};
// Crear tabla Cuentas, nombreCuenta, alias-cbu, saldo