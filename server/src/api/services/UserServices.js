// business logic for user-related operations
import User from "../models/User.js";

/**
 * Get all users from MongoDB
 */
const printUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

/**
 * Create a new user in MongoDB
 */
const getNewUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

/**
 * Get user by ID from MongoDB
 */
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

/**
 * Add a new user to the database
 */
const addUser = async (userData) => {
    try {
        // Check if user already exists
        const existingUser = await User.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        
        // Create and save new user (validation happens automatically)
        const user = new User(userData);
        await user.save();
        
        return user;
    } catch (error) {
        console.error("Error adding user:", error);
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            throw new Error(messages.join(', '));
        }
        throw error;
    }
};

/**
 * Check if a user exists by email
 */
const checkUserExists = async (email) => {
    try {
        const user = await User.findByEmail(email);
        return !!user; // Return true if user exists, false otherwise
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw error;
    }
};

/**
 * Get user profile by email
 */
const getProfile = async (email) => {
    try {
        const user = await User.findByEmail(email);
        
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        
        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export {
    printUsers,
    getNewUser,
    getUserById,
    addUser,
    checkUserExists,
    getProfile
};