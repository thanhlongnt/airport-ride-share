// call all the business logic from UserServices.js

import * as userServices from "../services/UserServices.js";

const getUsers = async (req, res) => {
    try {
        const users = await userServices.printUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getNewUser = async (req, res) => {
    try {
        const user = await userServices.getNewUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userServices.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const addUser = async (req, res) => {
    console.log("adding user")
    try {
        const user = await userServices.addUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    console.log("success!")
    
}

export {
    getUsers,
    getNewUser,
    getUserById,
    addUser
}