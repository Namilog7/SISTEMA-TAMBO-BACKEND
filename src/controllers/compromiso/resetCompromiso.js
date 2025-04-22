const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");

const resetCompromiso = async () => {
    const propietarios = await CasaPropietario.findAll({
        include: {
            model: CompromisoDePago,
            include: [MesesCompromiso],
        },
    });

    for (const propietario of propietarios) {
        for (const compromiso of propietario.CompromisoDePagos) {
            const totalMeses = compromiso.MesesCompromisos.length;

            if (compromiso.eventual && compromiso.cuotas > totalMeses) {
                await MesesCompromiso.create({
                    fecha: new Date(),
                    id_compromiso: compromiso.id,
                });
            } else if (!compromiso.eventual) {
                await MesesCompromiso.create({
                    fecha: new Date(),
                    id_compromiso: compromiso.id
                });
            }
        }
    }

    return "Todos los compromisos fueron procesados.";
};

module.exports = resetCompromiso

/*   if (diaCompromiso === diaActual && compromiso.estado_pago === "PAGADO") {
      compromiso.estado_pago = "PENDIENTE";
      await compromiso.save();
  } */