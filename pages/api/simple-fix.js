// pages/api/simple-fix.js
import dbConnect from '../../lib/mongodb';
import Campaign from '../../models/Campaign';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Update all campaigns to remove images temporarily
    const result = await Campaign.updateMany(
      {},
      { $set: { images: [] } }
    );
    
    res.status(200).json({
      success: true,
      message: `Cleared images from ${result.modifiedCount} campaigns. Using CSS backgrounds instead.`,
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Simple fix error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear images',
      error: error.message
    });
  }
}