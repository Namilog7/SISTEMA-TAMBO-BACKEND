const { RetiroLeche } = require("../../db");
const crudController = require("../../controllers/crudController");

const getRetiroLecheHandler = async (req, res) => {
    const getRetiroLeche = crudController(RetiroLeche);
    try {
        const response = await getRetiroLeche.readAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getRetiroLecheHandler