const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Nota", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM("CREDITO", "DEBITO"),
            allowNull: false,
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tipo_destinatario: {
            type: DataTypes.ENUM("CLIENTE", "PROVEEDOR", "EMPLEADO"),
            allowNull: false,
        },
    });
};
