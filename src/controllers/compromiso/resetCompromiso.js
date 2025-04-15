const { CompromisoDePago, MesesCompromiso } = require("../../db");

const resetCompromiso = async (id) => {
    const hoy = new Date();
    const diaActual = hoy.getDate();

    const compromisos = await CompromisoDePago.findAll({
        where: { id_propietario: id },
        include: [
            { model: MesesCompromiso }
        ]
    });

    for (const compromiso of compromisos) {
        const diaCompromiso = new Date(compromiso.fecha).getDate();

        /*   if (diaCompromiso === diaActual && compromiso.estado_pago === "PAGADO") {
              compromiso.estado_pago = "PENDIENTE";
              await compromiso.save();
          } */
        if (diaCompromiso >= diaActual && !compromiso.eventual) {
            const nuevoMes = await MesesCompromiso.create({
                fecha: new Date(),
            })
        }
        if (compromiso.cuotas > compromiso.MesesCompromisos.length) {
            const nuevaCuota = await MesesCompromiso.create({
                fecha: new Date()
            })
        }


    }

    return { message: "Compromisos actualizados según la fecha." };
};

module.exports = resetCompromiso