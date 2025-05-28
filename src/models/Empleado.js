const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Empleado",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cuit_cuil: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            dni: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sector: {
                type: DataTypes.ENUM("FABRICA", "TAMBO", "ADMINISTRACION", "AGRICULTURA", "RECRIA"),
                allowNull: false,
            },
            contacto: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        { timestamps: false }
    );
};
