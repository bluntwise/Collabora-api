import User from "../models/user.model.js";
import logger from "../helpers/logger.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Suppression des paramètres inutiles
        res.send(users);
        logger.info("GET All Users");

    } catch (err) {
        logger.error(JSON.stringify(err));
        res.status(500).send(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        logger.info("GET User By Id")
        logger.info(JSON.stringify(user));
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
        logger.error(JSON.stringify(err));
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
        res.status(400).send({ error: err});
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        logger.info("UPDATE User")
        logger.info(JSON.stringify(user));
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
        logger.error(JSON.stringify(err));

    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(204).send({ message : "Utilisateur supprimé"});
        logger.info("DELETE User")
        logger.info(JSON.stringify(user));
    } catch (err) {
        res.status(500).send({ error: err.message });
        logger.error(JSON.stringify(err));
    }
};