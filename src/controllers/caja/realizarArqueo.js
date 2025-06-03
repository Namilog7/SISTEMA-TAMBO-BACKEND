const { GastoIngreso, MetodoGastoIngreso } = require("../../db");
const { Op } = require("sequelize");

const realizarArqueo = async ({ desde, hasta }) => {
    const movimientos = await GastoIngreso.findAll({
        where: {
            fecha: {
                [Op.between]: [new Date(desde), new Date(hasta)],
            },
            estado: "ACEPTADO",
        },
        include: [
            {
                model: MetodoGastoIngreso,
            },
        ],
    });

    // Estructura para acumular resultados
    const arqueo = {};

    for (const mov of movimientos) {
        const tipo = mov.tipo; // 'INGRESO' o 'EGRESO'

        for (const metodo of mov.metodos) {
            const metodoPago = metodo.metodo;
            const monto = parseFloat(metodo.monto); // convertimos a número

            if (!arqueo[metodoPago]) {
                arqueo[metodoPago] = { INGRESO: 0, EGRESO: 0 };
            }

            arqueo[metodoPago][tipo] += monto;
        }
    }

    // Calcular saldo por método
    const resultadoFinal = Object.entries(arqueo).map(([metodo, valores]) => {
        return {
            metodo,
            ingreso: valores.INGRESO,
            egreso: valores.EGRESO,
            saldo: valores.INGRESO - valores.EGRESO,
        };
    });

    return resultadoFinal;
};

module.exports = realizarArqueo