const recoleccionPostModel = {
    litros: { type: "float", required: true },
    fecha: { type: "date", required: true },
    hora_recoleccion: { type: "time_hhmm", required: true },
    hora_carga: { type: "time_hhmm", required: true },
    usuario_carga: { type: "string", required: true },
    animales: { type: "int", required: true },
    aclaracion: { type: "string", required: false },
    estado: {
        type: "enum",
        values: ["ACTIVO", "CANCELADO"],
        required: true,
    },
};

const recoleccionPutModel = {
    litros: { type: "float", required: true }, // Campo obligatorio
    fecha: { type: "date", required: false },
    hora_recoleccion: { type: "time_hhmm", required: false },
    hora_carga: { type: "time_hhmm", required: false },
    usuario_carga: { type: "string", required: false },
    animales: { type: "int", required: false },
    aclaracion: { type: "string", required: false },
    estado: {
        type: "enum",
        values: ["ACTIVO", "CANCELADO"],
        required: false,
    },
};

module.exports = {
    recoleccionPostModel,
    recoleccionPutModel
}