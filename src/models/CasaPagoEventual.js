const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "CasaPagoEventual",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            monto_pagado: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: true
            },

        },
        { timestamps: false }
    );
};