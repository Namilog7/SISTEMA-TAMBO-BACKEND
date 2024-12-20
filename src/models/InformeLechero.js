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
            hora_inicio_ordeñe1_lote1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_fin_ordeñe1_lote1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_inicio_ordeñe1_lote2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_fin_ordeñe1_lote2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_inicio_ordeñe2_lote1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_fin_ordeñe2_lote1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_inicio_ordeñe2_lote2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_fin_ordeñe2_lote2: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );
};