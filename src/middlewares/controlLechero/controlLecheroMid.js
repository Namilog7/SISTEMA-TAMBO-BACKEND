const ordeñeValidationModel = {
    id_ganado: { type: "int", required: true },
    litros_ordeñe1: { type: "float", required: true }, // Campo obligatorio, número flotante
    litros_ordeñe2: { type: "float", required: true }, // Campo obligatorio, número flotante
    total: { type: "float", required: true }, // Campo obligatorio, número flotante que representa el total
    observacion: { type: "string", required: false } // Campo opcional, texto para observaciones
};
module.exports = ordeñeValidationModel