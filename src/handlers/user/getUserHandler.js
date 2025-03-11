const { User } = require("../../db");

const getUserHandler = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserHandler;
