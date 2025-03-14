const RetiroLeche = require("../../../db");


const getRetiroByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const retiros = await RetiroLeche.findAll({
            where: { id_cliente: id }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = getRetiroByIdHandler