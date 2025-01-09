const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Transaccion",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            monto: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE
            },
            tipo: {
                type: DataTypes.ENUM("INGRESO", "EGRESO")
            },
            metodo: {
                type: DataTypes.ENUM("TRANSFERENCIA", "CHEQUE", "EFECTIVO")
            }
        },
        { timestamps: false }
    );
};