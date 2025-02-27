const ganadoValidationModel = {
    caravana: { type: "string", required: true }, // Campo obligatorio
    detalles: { type: "string", required: false }, // Campo opcional
    fecha_ingreso: { type: "date", required: true }, // Campo obligatorio
};

const ganadoValidationModelPut = {
    id: { type: "number", required: true },
    caravana: { type: "string", required: true }, // Campo obligatorio para identificar el ganado
    detalles: { type: "string", required: false }, // Campo opcional
    fecha_ingreso: { type: "date", required: false }, // Opcional para PUT
};

module.exports = {
    ganadoValidationModel,
    ganadoValidationModelPut
};
