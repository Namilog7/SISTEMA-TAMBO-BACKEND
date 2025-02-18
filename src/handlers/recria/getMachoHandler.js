const { Macho } = require("../../db");

const getMachoHandler = async (req, res) => {
    try {
        const machos = await Macho.findAll();

        const terneroContadorTotal = machos.reduce((total, macho) => {
            return total + (parseInt(macho.ternero_contador, 10) || 0);
        }, 0);

        const response = {
            ternero_contador: terneroContadorTotal,
            machos
        };

        return res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getMachoHandler;
