// define routes for user-related endpoints, and call the controller methods
import express from "express";
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

// Get all users
router.get("/", UserController.getUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Add a new user
router.post("/", UserController.addUser);

export default router;