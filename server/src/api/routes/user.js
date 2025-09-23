// define routes for user-related endpoints, and call the controller methods
import express from "express";
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/new", UserController.getNewUser);

router.get("/:id", UserController.getUserById);

export default router;