// define routes for post-related endpoints, and call the controller methods
import express from "express";
import * as PostsController from "../controllers/PostsController.js";

const router = express.Router();

// Get all active posts
router.get("/", PostsController.getAllPosts);

// Get post by ID
router.get("/:id", PostsController.getPostById);

// Get posts by user email
router.get("/user/:email", PostsController.getPostsByEmail);

// Create a new post
router.post("/", PostsController.createPost);

// Mark post as resolved
router.patch("/:id/resolve", PostsController.resolvePost);

// Delete post by ID
router.delete("/:id", PostsController.deletePost);

export default router;
