const crudController = require("../../controllers/crudController");
const { Tambo } = require("../../db")

const getTamboHandler = async (req, res) => {
    const tamboCrud = crudController(Tambo)
    try {
        const response = await tamboCrud.readAll()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getTamboHandler