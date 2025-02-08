const { ProduccionLeche } = require("../../../db");
const getPartialRecords = require("../../../controllers/getPartialRecords");

const getPartialProduccionLecheHandler = async (req, res) => {
    try {
        const response = await getPartialRecords(ProduccionLeche);
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getPartialProduccionLecheHandler