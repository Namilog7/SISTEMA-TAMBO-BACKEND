const insumoValidationModel = {
    nombre: { type: "string", required: true }, // Campo obligatorio
    stock: { type: "integer", required: true }, // Campo obligatorio
    ultimo_ingreso: { type: "date", required: true }, // Campo obligatorio
    tipo: {
        type: "enum",
        values: ["MEDICAMENTO", "ALIMENTO", "VARIO"],
        required: true // Campo obligatorio
    },
};

module.exports = { insumoValidationModel };
