// call all the business logic from UserServices.js

const userController = require("../services/UserServices");

const getUsers = (req, res) => {
    res.send(userController.printUsers());
}

const getNewUser = (req, res) => {
  res.send(userController.getNewUser());
}

const getUserById = (req, res) => {
  res.send(userController.getUserById(req.params.id));
}

module.exports = {
    getUsers,
    getNewUser,
    getUserById
}