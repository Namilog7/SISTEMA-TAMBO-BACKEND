const { ChequeRecibido } = require("../../db");
const crudController = require("../../controllers/crudController");

const putChequeRecibidoHandler = async (req, res) => {
  const {
    id,
    banco,
    origen,
    numero_cheque,
    fecha_emision,
    fecha_pago,
    importe,
    destino,
    estado,  
  } = req.body;

  const postCheque = crudController(ChequeRecibido);
  try {
    const putCheque = await postCheque.update({
      id,
      banco,
      origen,
      numero_cheque,
      fecha_emision,
      fecha_pago,
      importe,
      destino,
      estado, 
    });
    res.json(putCheque);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = putChequeRecibidoHandler;
