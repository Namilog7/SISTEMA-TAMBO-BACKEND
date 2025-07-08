const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Proveedor",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre_empresa: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            contacto_1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            localidad: {
                type: DataTypes.STRING,
                allowNull: false
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            }
        },
        { timestamps: false }
    );
};