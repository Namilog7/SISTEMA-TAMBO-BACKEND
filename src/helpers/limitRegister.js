const { Model } = require("sequelize");

const limitRegister = async (model) => {
    if (!(model?.prototype instanceof Model)) {
        throw new Error("Pasale un modelo a la funcion corneta");
    }

    const count = await model.count();

    if (count >= 6) {
        throw new Error("Has alcanzado el límite de usuarios.");
    }
};

module.exports = limitRegister;
