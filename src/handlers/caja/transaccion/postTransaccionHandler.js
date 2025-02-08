
const postTransaccionHandler = async (req, res) => {
    const { monto, descripcion, fecha, tipo, metodo, id_cheque, id_transferencia, id_caja } = req.body
    try {
        if (id_cheque) {
            const newCheque = await createCheque()
            return
        }
        else if (id_transferencia) {

        }
        else {

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
module.exports = postTransaccionHandler