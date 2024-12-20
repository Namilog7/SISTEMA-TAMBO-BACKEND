const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InformeLechero",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            litros_lote1: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            litros_lote2: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            hora_inicio: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_fin: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );
};