// call all the business logic from UserServices.js

import * as userController from "../services/UserServices.js";

const getUsers = (req, res) => {
    res.send(userController.printUsers());
}

const getNewUser = (req, res) => {
  res.send(userController.getNewUser());
}

const getUserById = (req, res) => {
  res.send(userController.getUserById(req.params.id));
}

export {
    getUsers,
    getNewUser,
    getUserById
}