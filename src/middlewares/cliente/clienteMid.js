const empresaValidationModel = {
    nombre_empresa: { type: "string", required: true }, // Campo obligatorio
    propietario: { type: "string", required: true }, // Campo obligatorio
    cuit_cuil: { type: "string", required: true }, // Campo obligatorio, CUIT o CUIL en formato texto
    contacto_1: { type: "string", required: true }, // Campo obligatorio, primer contacto
    contacto_2: { type: "string", required: false }, // Campo opcional, segundo contacto
};

module.exports = empresaValidationModel;
