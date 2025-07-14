// const { Comprobante, ComprobanteInsumo, Insumo } = require("../../db");

// const getComprobantesCargadosHandler = async (req, res) => {
//     try {
//         const comprobantes = await Comprobante.findAll({
//             include: [
//                 {
//                     model: ComprobanteInsumo,
//                     as: "comprobanteInsumos",
//                     include: [
//                         {
//                             model: Insumo,
//                         },
//                     ],
//                 },
//             ],
//         });

//         res.status(200).json(comprobantes);
//     } catch (error) {
//         console.error("Error al obtener comprobantes:", error);
//         res.status(500).json({ error: "Error al obtener comprobantes" });
//     }
// };
// module.exports = getComprobantesCargadosHandler;

const { Comprobante, ComprobanteInsumo, Insumo, Sector } = require("../../db");

const getComprobantesCargadosHandler = async (req, res) => {
    try {
        // 1. Traer todos los sectores una sola vez
        const sectores = await Sector.findAll();
        const mapaSectores = {};
        sectores.forEach((sector) => {
            mapaSectores[sector.id] = sector.nombre;
        });

        // 2. Traer comprobantes con sus insumos
        const comprobantes = await Comprobante.findAll({
            include: [
                {
                    model: ComprobanteInsumo,
                    as: "comprobanteInsumos",
                    include: [{ model: Insumo }],
                },
            ],
        });

        // 3. Agregar el nombre del sector a cada comprobante
        const comprobantesConSector = comprobantes.map((comprobante) => {
            const json = comprobante.toJSON(); // Convertir a objeto plano
            json.nombre_sector = mapaSectores[comprobante.id_sector_imputado] || null;
            return json;
        });

        res.status(200).json(comprobantesConSector);
    } catch (error) {
        console.error("Error al obtener comprobantes:", error);
        res.status(500).json({ error: "Error al obtener comprobantes" });
    }
};

module.exports = getComprobantesCargadosHandler;
