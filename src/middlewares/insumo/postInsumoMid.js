const insumoValidationModel = {
    nombre: { type: "string", required: true }, // Campo obligatorio
    stock: { type: "integer", required: true }, // Campo obligatorio
    ultimo_ingreso: { type: "date", required: true }, // Campo obligatorio
};

module.exports = { insumoValidationModel };
