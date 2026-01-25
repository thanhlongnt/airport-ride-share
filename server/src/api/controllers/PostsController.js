// call all the business logic from PostsServices.js

import * as postServices from "../services/PostsServices.js";

const createPost = async (req, res) => {
    try {
        const post = await postServices.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postServices.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postServices.getPostById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getPostsByEmail = async (req, res) => {
    try {
        const posts = await postServices.getPostsByEmail(req.params.email);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await postServices.deletePost(req.params.id);
        res.json({ message: 'Post deleted successfully', post });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const resolvePost = async (req, res) => {
    try {
        const post = await postServices.resolvePost(req.params.id);
        res.json({ message: 'Post marked as resolved', post });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByEmail,
    deletePost,
    resolvePost
};
