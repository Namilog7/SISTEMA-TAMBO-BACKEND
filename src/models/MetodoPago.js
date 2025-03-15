const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "MetodoPago",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            metodo: {
                type: DataTypes.ENUM("EFECTIVO", "TRANSFERENCIA", "CHEQUE", "OTROS", "CUENTA_CORRIENTE"),
                allowNull: false
            },
            importe: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};