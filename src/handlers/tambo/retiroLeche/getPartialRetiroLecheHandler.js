const getPartialRecords = require("../../../controllers/getPartialRecords");
const { RetiroLeche } = require("../../../db");

const getPartialRetiroLecheHandler = async (req, res) => {
    try {
        const response = await getPartialRecords(RetiroLeche)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getPartialRetiroLecheHandler