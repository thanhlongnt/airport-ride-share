// business logic for post-related operations
import Post from "../models/Post.js";

/**
 * Create a new post in MongoDB
 */
const createPost = async (postData) => {
    try {
        // Check if user already has an active post
        const existingPost = await Post.findOne({ 
            email: postData.email, 
            status: 'active' 
        });
        
        if (existingPost) {
            throw new Error('User already has an active post. Please resolve the existing post first.');
        }
        
        const post = new Post(postData);
        await post.save();
        return post;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

/**
 * Get all active posts from MongoDB
 */
const getAllPosts = async () => {
    try {
        const posts = await Post.find({ status: 'active' }).sort({ createdAt: -1 });
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

/**
 * Get post by ID from MongoDB
 */
const getPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        
        if (!post) {
            throw new Error(`Post with ID ${id} not found`);
        }
        
        return post;
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};

/**
 * Get posts by user email
 */
const getPostsByEmail = async (email) => {
    try {
        const posts = await Post.find({ email, status: 'active' });
        return posts;
    } catch (error) {
        console.error("Error fetching posts by email:", error);
        throw error;
    }
};

/**
 * Delete post by ID from MongoDB
 */
const deletePost = async (id) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        
        if (!post) {
            throw new Error(`Post with ID ${id} not found`);
        }
        
        return post;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

/**
 * Mark post as resolved
 */
const resolvePost = async (id) => {
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { status: 'resolved' },
            { new: true }
        );
        
        if (!post) {
            throw new Error(`Post with ID ${id} not found`);
        }
        
        return post;
    } catch (error) {
        console.error("Error resolving post:", error);
        throw error;
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
