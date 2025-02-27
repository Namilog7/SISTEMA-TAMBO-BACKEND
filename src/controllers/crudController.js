const createController = (model) => ({
    async create(obj) {
        try {
            const data = await model.create(obj);
            return data;
        } catch (error) {
            return { error: error.message };
        }
    },

    async readAll(req) {
        try {
            const data = await model.findAll();
            return data;
        } catch (error) {
            return { error: error.message };
        }
    },

    async readOne(req) {
        try {
            const { id } = req.params;
            const data = await model.findByPk(id);
            if (data) {
                return data;
            } else {
                return { error: 'Not found' };
            }
        } catch (error) {
            return { error: error.message };
        }
    },

    async update(obj) {
        const { id } = obj
        try {
            const [updated] = await model.update(obj, { where: { id: id } });
            if (updated) {
                const updatedData = await model.findByPk(id);
                return updatedData;
            } else {
                return { error: 'Not found' };
            }
        } catch (error) {
            return { error: error.message };
        }
    },

    async delete(id) {
        try {
            const deleted = await model.destroy({ where: { id } });
            if (deleted) {
                return deleted;
            } else {
                return { error: 'Not found' };
            }
        } catch (error) {
            return { error: error.message };
        }
    },
});

module.exports = createController;
