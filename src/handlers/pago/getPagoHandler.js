const { Pago, MetodoPago } = require("../../db");

const getPagoHandler = async (req, res) => {
    const { id } = req.params;
    const { proovedor } = req.query
    try {
        let pagos;
        if (proovedor) {
            pagos = await Pago.findAll({
                where: {
                    id_proveedor: id
                },
                include: [
                    {
                        model: MetodoPago,
                    }
                ]
            });

        } else {
            pagos = await Pago.findAll({
                where: {
                    id_cliente: id
                },
                include: [
                    {
                        model: MetodoPago,
                    }
                ]
            });
        }

        res.json({ pagos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getPagoHandler;
