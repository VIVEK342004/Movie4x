const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use MONGO_URI from .env, fallback to local DB if not provided
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie4x';

        // Setup connection event listeners
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB connection lost. Retrying...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected successfully.');
        });

        // Attempt to connect
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('⚠️ Server is running with limited functionality. Database features are currently unavailable.');
        // We do NOT use process.exit(1) here to ensure the Express server stays alive
    }
};

module.exports = connectDB;
