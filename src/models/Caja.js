const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Caja",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            nombre_caja: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: true
            }
        },
        { timestamps: false }
    );
};