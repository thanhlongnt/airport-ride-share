// define routes for user-related endpoints, and call the controller methods
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);

router.get("/new", UserController.getNewUser);

router.get("/:id", UserController.getUserById);

module.exports = router;