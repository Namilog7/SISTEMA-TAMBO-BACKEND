const getPartialRetiroLeche = require("../../controllers/retiroLeche/getPartialRetiroLeche")
const getPartialRetiroLecheHandler = async (req, res) => {
    try {
        const response = await getPartialRetiroLeche()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getPartialRetiroLecheHandler