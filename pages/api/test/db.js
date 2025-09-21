import dbConnect from "../../../lib/mongodb";
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔄 Connecting to MongoDB with Mongoose...');
    
    // Use your existing dbConnect function
    await dbConnect();
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // Get connection info
    const connectionState = mongoose.connection.readyState;
    const dbName = mongoose.connection.db?.databaseName || 'unknown';
    
    // List collections using mongoose
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    res.status(200).json({
      success: true,
      message: "✅ Connected to MongoDB successfully!",
      database: dbName,
      connectionState: connectionState === 1 ? 'connected' : 'disconnected',
      collections: collections.map(col => col.name),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    res.status(500).json({ 
      success: false,
      message: "❌ Failed to connect to MongoDB", 
      error: error.message,
      mongoUri: process.env.MONGODB_URI ? 'URI exists' : 'URI missing'
    });
  }
}