const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ProveedorInsumo",
        {
            precio: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ultimo_ingreso: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
