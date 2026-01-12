import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

class DBConfig {
  constructor() {
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB using Mongoose
   */
  async connectDB() {
    if (this.isConnected) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }

    console.log("Connecting to DB");

    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });

      this.isConnected = true;
      console.log("Successfully connected to MongoDB!");
      
      return mongoose.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  /**
   * Get database connection (Singleton)
   */
  async getDB() {
    if (!this.isConnected || mongoose.connection.readyState !== 1) {
      console.log("No connection, connecting now");
      await this.connectDB();
    }
    return mongoose.connection;
  }

  /**
   * Close MongoDB connection
   */
  async closeDB() {
    if (this.isConnected) {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log("MongoDB connection closed");
    }
  }
}

const dbConfig = new DBConfig();

export default dbConfig;