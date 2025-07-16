const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("DocumentoInsumos", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Crear tabla Cuentas, nombreCuenta, alias-cbu, saldo
    });
};
