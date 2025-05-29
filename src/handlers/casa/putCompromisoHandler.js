const { CompromisoDePago } = require("../../db");
const crudController = require("../../controllers/crudController");

const putPropietarioHandler = async (req, res) => {
    const { nombre, cuotas, id } = req.body;
    const updateCompromiso = crudController(CompromisoDePago);

    try {
        const update = await updateCompromiso.update({ nombre, cuotas, id });
        res.json(update);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putPropietarioHandler;
