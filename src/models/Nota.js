const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Nota",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tipo: {
                type: DataTypes.ENUM("CREDITO", "DEBITO"),
                allowNull: false
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            fecha_emision: {
                type: DataTypes.DATE,
                allowNull: false
            },
            tipo_destinatario: {
                type: DataTypes.ENUM("CLIENTE", "PROOVEDOR"),
                allowNull: false
            }
        }
    );
};