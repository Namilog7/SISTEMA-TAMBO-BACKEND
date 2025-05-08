const createController = (model) => ({
    async create(obj, { transaction }) {

        const data = await model.create(obj, { transaction });
        return data;
    },

    async readAll(req) {
        const data = await model.findAll();
        return data;
    },

    async readOne(req) {
        const { id } = req.params;
        const data = await model.findByPk(id);
        if (data) {
            return data;
        } else {
            throw new Error("Error en el crudController")
        }
    },

    async update(obj) {
        const { id } = obj

        const [updated] = await model.update(obj, { where: { id: id } });
        if (updated) {
            const updatedData = await model.findByPk(id);
            return updatedData;
        } else {
            throw new Error("Error en el crudController");
        }
    },

    async delete(id) {

        const deleted = await model.destroy({ where: { id } });
        if (deleted) {
            return deleted;
        } else {
            throw new Error("Error en el crudController")
        }
    },
});

module.exports = createController;
