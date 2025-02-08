const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ingreso_recria",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            tipo_ingreso: {
                type: DataTypes.ENUM("COMPRA", "PARTO", "ENTREGA"),
                allowNull: false
            },
            fecha_carga: {
                type: DataTypes.DATE,
                allowNull: false
            },
            hora_carga: {
                type: DataTypes.STRING,
                allowNull: true
            },
            aclaraciones: {
                type: DataTypes.STRING,
                allowNull: true
            },
            usuario_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            importe: {
                type: DataTypes.FLOAT
            }
        }
    );
};