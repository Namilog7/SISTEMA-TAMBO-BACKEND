const postRetiroLecheModel = {
    cantidad: { type: "float", required: true }, // Cantidad numérica con decimales, campo obligatorio
    fecha: { type: "date", required: true }, // Fecha en formato YYYY-MM-DD, campo obligatorio
    liquidado: { type: "boolean", required: true }, // Booleano que indica si está liquidado, campo obligatorio
    hora_carga: { type: "time", required: false }, // Hora en formato HH:mm:ss, campo opcional
    hora_retiro: { type: "time", required: false }, // Hora en formato HH:mm:ss, campo opcional
    aclaracion: { type: "string", required: false }, // Texto opcional para observaciones
    estado: {
        type: "enum",
        values: ["ACTIVO", "CANCELADO"], // Estado con valores restringidos
        required: true // Campo obligatorio
    },
    id_liquidacion: { type: "int", required: false } // Identificador numérico de la liquidación, campo opcional
};


const retiroLecheUpdateModel = {
    id: { type: "int", required: true }, // Campo obligatorio
    cantidad: { type: "int", required: false },
    fecha: { type: "date", required: false },
    liquidado: { type: "boolean", required: false },
    hora_carga: { type: "time_hhmm", required: false }, // Formato HH:mm opcional
    hora_retiro: { type: "time_hhmm", required: false }, // Formato HH:mm opcional
    aclaracion: { type: "string", required: false },
    usuario_carga: { type: "string", required: false },
    estado: { type: "boolean", required: false },
};

module.exports = {
    postRetiroLecheModel,
    retiroLecheUpdateModel
}