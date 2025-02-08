const proovedorValidateMid = {
    nombre: { type: "string", required: true }, // Campo obligatorio
    contacto_1: { type: "string", required: true }, // Campo obligatorio
    contacto_2: { type: "string", required: false }, // Campo opcional
    localidad: { type: "string", required: true } // Campo obligatorio
};

module.exports = proovedorValidateMid;
