const tanqueValidationModel = {
    litros_tanque: { type: "float", required: true }, // Obligatorio, representa litros en el tanque
    hora_inicio_ordeñe1_lote1: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_fin_ordeñe1_lote1: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_inicio_ordeñe1_lote2: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_fin_ordeñe1_lote2: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_inicio_ordeñe2_lote1: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_fin_ordeñe2_lote1: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_inicio_ordeñe2_lote2: { type: "string", required: true }, // Formato hh:mm, obligatorio
    hora_fin_ordeñe2_lote2: { type: "string", required: true } // Formato hh:mm, obligatorio
};

module.exports = tanqueValidationModel