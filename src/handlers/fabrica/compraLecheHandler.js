const { CompraLeche, TamboProveedor } = require("../../db");

const getCompraLecheHandler = async (req, res) => {
    try {
        const compraLeche = await CompraLeche.findAll({
            include: [
                {
                    model: TamboProveedor,
                },
            ],
        });

        console.log(compraLeche);

        res.json(compraLeche);
    } catch (error) {
        console.error("Error en getCompraLecheHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCompraLecheHandler;
