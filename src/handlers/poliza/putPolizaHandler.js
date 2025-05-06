const crudController = require("../../controllers/crudController");
const postCloudinary = require("../../controllers/postCloudinary");
const { PolizaSeguro } = require("../../db");
const cloudinary = require("cloudinary").v2;

const putPolizaHandler = async (req, res) => {
    const {
        id,
        nombre,
        seccion,
        desde,
        hasta,
        importe,
        estado,
        cantidad_cuotas,
        factura_base64,
        afectados,
    } = req.body;

    const putPoliza = crudController(PolizaSeguro);

    try {
        let foto_factura;

        const polizaActual = await PolizaSeguro.findByPk(id);

        if (factura_base64) {
            // Eliminar imagen anterior si existe
            if (polizaActual && polizaActual.foto_factura) {
                const publicId = polizaActual.foto_factura
                    .split("/")
                    .slice(-1)[0]
                    .split(".")[0]; // obtener el nombre del archivo sin extensión

                await cloudinary.uploader.destroy(`poliza_facturas/${publicId}`);
            }

            foto_factura = await postCloudinary(factura_base64, "poliza_facturas");
        }

        const update = await putPoliza.update({
            id,
            nombre,
            seccion,
            desde,
            hasta,
            importe,
            estado,
            cantidad_cuotas,
            foto_factura,
            afectados,
        });

        res.json(update);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putPolizaHandler;
