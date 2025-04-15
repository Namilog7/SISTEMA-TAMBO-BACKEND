const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "MesesCompromiso",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            estado_pago: {
                type: DataTypes.ENUM("PENDIENTE", "PAGADO"),
                allowNull: false,
                defaultValue: "PENDIENTE"
            },
            monto: {
                type: DataTypes.FLOAT,
                allowNull: true
            }

        },
        { timestamps: false }
    );
};