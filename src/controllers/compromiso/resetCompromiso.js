const { CasaPropietario, CompromisoDePago, MesesCompromiso } = require("../../db");

const resetCompromiso = async () => {
    const hoy = new Date();
    const diaActual = hoy.getDate();

    const propietarios = await CasaPropietario.findAll({
        include: {
            model: CompromisoDePago,
            include: [MesesCompromiso],
        },
    });

    for (const propietario of propietarios) {
        for (const compromiso of propietario.CompromisoDePagos) {
            const diaCompromiso = new Date(compromiso.fecha).getDate();

            if (diaCompromiso === diaActual && !compromiso.eventual) {
                await MesesCompromiso.create({
                    fecha: new Date(),
                    id_compromiso: compromiso.id,
                });
            }
        }
    }

    return "Todos los compromisos fueron procesados.";
};

module.exports = resetCompromiso;

/*   if (diaCompromiso === diaActual && compromiso.estado_pago === "PAGADO") {
      compromiso.estado_pago = "PENDIENTE";
      await compromiso.save();
  } */