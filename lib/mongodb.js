// lib/mongodb.js
import mongoose from 'mongoose';

const isMock = process.env.MOCK_MODE === 'true';
const MONGODB_URI = process.env.MONGODB_URI;

// In mock mode, skip requiring a database entirely
if (!MONGODB_URI && !isMock) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Mongoose connection configuration
const options = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000, // 45 seconds timeout
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  minPoolSize: 5,  // Minimum number of connections in the connection pool
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (isMock) {
    // No-op in mock mode
    return null;
  }
  // If already connected, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise doesn't exist, create it
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        cached.promise = null; // Reset promise on error
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    throw error;
  }
}

export default dbConnect;