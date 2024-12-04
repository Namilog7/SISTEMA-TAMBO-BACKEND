const { Tambo } = require("../../db")

const deleteTambo = async ({ id }) => {
    const deleteTambo = await Tambo.destroy({
        where: { id }
    })
    return deleteTambo
}

module.exports = deleteTambo