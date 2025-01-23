const crudController = require("../../controllers/crudController")
const { Sector } = require("../../db")

const getSectorHandler = async (req, res) => {
    const getSector = crudController(Sector)
    try {
        const sectors = await getSector.readAll()
        res.json(sectors)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getSectorHandler