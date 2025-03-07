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
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ultimo_ingreso: {
                type: DataTypes.DATE
            },
            precio_mayorista: {
                type: DataTypes.FLOAT
            },
            precio_minorista: {
                type: DataTypes.FLOAT
            },
            precio_3: {
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