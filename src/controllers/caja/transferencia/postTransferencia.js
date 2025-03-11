
const postTransferencia = async (req, res) => {
    const {
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle
    } = req.body
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}