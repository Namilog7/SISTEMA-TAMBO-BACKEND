const recoleccionPostModel = {
    litros: { type: "float", required: true },
    fecha: { type: "date", required: true },
    hora_recoleccion: { type: "time_hhmm", required: true },
    hora_carga: { type: "time_hhmm", required: true },
    cantidad_animales: { type: "int", required: true },
    aclaracion: { type: "string", required: false },
    estado: {
        type: "enum",
        values: ["ACTIVO", "CANCELADO"],
        required: true,
    },
};

const recoleccionPutModel = {
    id: { type: "int", required: true },
    litros: { type: "float", required: true }, // Campo obligatorio
    fecha: { type: "date", required: false },
    hora_recoleccion: { type: "time_hhmm", required: false },
    hora_carga: { type: "time_hhmm", required: false },
    cantidad_animales: { type: "int", required: false },
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