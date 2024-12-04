const getTambo = require("../../controllers/tambo/getTambo");

const getTamboHandler = async (req, res) => {
    try {
        const response = await getTambo()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getTamboHandler