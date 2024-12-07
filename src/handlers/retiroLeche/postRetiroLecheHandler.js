const { RetiroLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const retiroLecheHandler = async (req, res) => {
    const { cantidad, fecha, liquidado, id_tambo } = req.body
    const postRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await postRetiroLeche.create({ cantidad, fecha, liquidado, id_tambo })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = retiroLecheHandler