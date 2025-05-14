import User from "../models/user.model.js";
import logger from "../helpers/logger.js";


export const getAllUsers = async (req, res) => {
    logger.info("Get ALL USERS");
    try {
        const users = await User.find(); // Suppression des paramètres inutiles
        res.send(users);

    } catch (err) {
        res.status(500).send(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await new User(req.body);
        logger.info("Post NEW USER")
        logger.info(JSON.stringify(user));

        const result = await user.save();
        res.send(result);
    } catch (err) {
        logger.error(err);
        console.log(err);
        res.status(400).send({ error: err});
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(204).send({ message : "Utilisateur supprimé"});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


export const testUser = async (req, res) => {
    res.send("alan")
}