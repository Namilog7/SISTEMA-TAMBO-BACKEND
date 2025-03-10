const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Producto",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ultimo_ingreso: {
                type: DataTypes.DATE
            },
            precio_reventa: {
                type: DataTypes.FLOAT
            },
            precio_comercio: {
                type: DataTypes.FLOAT
            },
            precio_consumidor_final: {
                type: DataTypes.FLOAT
            },
            ultima_venta: {
                type: DataTypes.DATE
            },
            litro_variedad: {
                type: DataTypes.FLOAT
            },
            masa_sin_elaborar: {
                type: DataTypes.FLOAT
            }
        },
        { timestamps: false }
    );
};