const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InformeLechero",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            litros_tanque: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            litros_medidos: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            total_vacas_ordeñe: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            promedio_tambo: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            hora_carga: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
};