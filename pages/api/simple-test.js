// pages/api/simple-test.js
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    console.log('=== DEBUG INFO ===');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    console.log('MongoDB URI length:', process.env.MONGODB_URI?.length || 0);
    console.log('MongoDB URI start:', process.env.MONGODB_URI?.substring(0, 30) + '...' || 'not found');
    
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({
        success: false,
        message: 'MONGODB_URI environment variable not found'
      });
    }

    // Simple direct connection with short timeout
    console.log('Attempting connection...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('Connection successful!');
    console.log('Database name:', mongoose.connection.db?.databaseName);
    
    res.status(200).json({
      success: true,
      message: 'Connection successful!',
      database: mongoose.connection.db?.databaseName,
      readyState: mongoose.connection.readyState
    });

  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Connection failed',
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code
    });
  }
}