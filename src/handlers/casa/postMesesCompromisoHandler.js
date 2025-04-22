const resetCompromiso = require("../../controllers/compromiso/resetCompromiso")


const postMesesCompromisoHandler = async (req, res) => {
    const { falsotoken } = req.query
    try {
        if (falsotoken == "token1234") {
            const nuevoMesCompromiso = await resetCompromiso();
            return res.json(nuevoMesCompromiso)
        }
        res.json({ message: "No tenes acceso" })
    } catch (error) {
        console.log(error);
        res.status().json({ error: error.message })
    }
}

module.exports = postMesesCompromisoHandler