const { CompromisoDePago } = require("../../db");

const resetCompromiso = async () => {
    const hoy = new Date();
    const diaActual = hoy.getDate();

    const compromisos = await CompromisoDePago.findAll();

    for (const compromiso of compromisos) {
        const diaCompromiso = new Date(compromiso.fecha).getDate();

        if (diaCompromiso === diaActual && compromiso.estado_pago === "PAGADO") {
            compromiso.estado_pago = "PENDIENTE";
            await compromiso.save();
        }
    }

    return { message: "Compromisos actualizados según la fecha." };
};

module.exports = resetCompromiso