const ventaLecheValidationModel = {
    fecha: { type: "date", required: true }, // Campo obligatorio, formato YYYY-MM-DD
    hora_retiro: { type: "time", required: true }, // Campo obligatorio, formato HH:mm:ss
    hora_carga: { type: "time", required: true }, // Campo obligatorio, formato HH:mm:ss
    litros: { type: "float", required: true }, // Campo obligatorio, debe ser un número flotante
    aclaracion: { type: "string", required: false }, // Campo opcional
    encargado_retiro: { type: "string", required: true }, // Campo obligatorio
    patente_camion: { type: "string", required: true }, // Campo obligatorio
    usuario_carga: { type: "string", required: true }, // Campo obligatorio
    id_cliente: { type: "int", required: true }, // Campo obligatorio, debe ser un entero
};

module.exports = ventaLecheValidationModel