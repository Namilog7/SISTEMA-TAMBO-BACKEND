const ganadoValidationModel = {
    caravana: { type: "string", required: true }, // Campo obligatorio
    detalles: { type: "string", required: false }, // Campo opcional
    tipo: {
        type: "enum",
        values: ["VACA", "TERNERO", "NOVILLO"],
        required: true // Campo obligatorio
    },
    fecha_ingreso: { type: "date", required: true }, // Campo obligatorio
    estado: {
        type: "enum",
        values: ["RECRIA", "ORDEÑE", "ENGORDE"],
        required: true // Campo obligatorio
    }
};

const ganadoValidationModelPut = {
    id: { type: "number", required: true },
    caravana: { type: "string", required: true }, // Campo obligatorio para identificar el ganado
    detalles: { type: "string", required: false }, // Campo opcional
    tipo: {
        type: "enum",
        values: ["VACA", "TERNERO", "NOVILLO"],
        required: false // Opcional para PUT
    },
    fecha_ingreso: { type: "date", required: false }, // Opcional para PUT
    estado: {
        type: "enum",
        values: ["RECRIA", "ORDEÑE", "ENGORDE"],
        required: false // Opcional para PUT
    }
};

module.exports = {
    ganadoValidationModel,
    ganadoValidationModelPut
};
