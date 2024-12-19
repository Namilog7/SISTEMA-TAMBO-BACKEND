const postRetiroLecheModel = {
    cantidad: "float",
    fecha: "date",
    liquidado: "boolean",
    hora_carga: "time_hhmm",
    hora_retiro: "time_hhmm",
    aclaracion: "string",
    usuario_carga: "string",
    estado: {
        type: "enum",
        values: ["ACTIVO", "CANCELADO"],
        required: true // Campo obligatorio
    },
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