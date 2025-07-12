const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Transferencia", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        //tipo : credito, debito, interno : credito suma , debito resta, interno cambia entre cuentas pero no en saldo general
        tipo: {
            type: DataTypes.ENUM("CREDITO", "DEBITO", "INTERNO"),
        },
        estado: {
            type: DataTypes.ENUM("ANULADA", "ACEPTADA", "PENDIENTE"),
            allowNull: false,
            defaultValue: "PENDIENTE",
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // id_origen, id_destino: no obligatorios
        id_origen: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        id_destino: {
            type: DataTypes.UUID,
            allowNull: true,
        },

        // nombre
        nombre_origen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombre_destino: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};
// Crear tabla Cuentas, nombreCuenta, alias-cbu, saldo
