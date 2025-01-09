const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Lote",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            hora_inicio_ordeñe1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hora_fin_ordeñe1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_inicio_ordeñe2: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_fin_ordeñe2: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nombre_lote: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
};