const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "CompromisoDePago",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre_servicio: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            eventual: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            cuotas: {
                type: DataTypes.INTEGER,
                allowNull: true
            }

        },
        { timestamps: false }
    );
};