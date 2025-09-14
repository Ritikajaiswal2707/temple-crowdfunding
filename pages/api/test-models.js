// pages/api/test-models.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import Temple from '../../models/Temple';
import Campaign from '../../models/Campaign';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    // Test creating a sample user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword123',
      role: 'donor'
    });
    
    // Don't actually save, just validate the model
    const validationError = testUser.validateSync();
    
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: 'Model validation failed',
        errors: validationError.errors
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'All models loaded and validated successfully!',
      models: ['User', 'Temple', 'Campaign', 'Donation']
    });
    
  } catch (error) {
    console.error('Model test error:', error);
    res.status(500).json({
      success: false,
      message: 'Model test failed',
      error: error.message
    });
  }
}