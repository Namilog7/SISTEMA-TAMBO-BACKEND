

const calcularMontoMetodos = async ({ metodosPago }) => {
    return metodosPago.reduce((acumulador, metodo) => acumulador + metodo.monto, 0)
}

module.exports = calcularMontoMetodos
