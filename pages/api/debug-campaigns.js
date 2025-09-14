// pages/api/debug-campaigns.js
import dbConnect from '../../lib/mongodb';
import Campaign from '../../models/Campaign';
import Temple from '../../models/Temple';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    // Get all campaigns with temple details
    const campaigns = await Campaign.find({})
      .populate('temple', 'name location deity')
      .sort({ createdAt: -1 });
    
    const campaignData = campaigns.map(campaign => ({
      id: campaign._id,
      title: campaign.title,
      temple: campaign.temple?.name || 'No temple',
      images: campaign.images,
      status: campaign.status,
      featured: campaign.featured,
      createdAt: campaign.createdAt
    }));
    
    res.status(200).json({
      success: true,
      totalCampaigns: campaigns.length,
      campaigns: campaignData
    });
    
  } catch (error) {
    console.error('Debug campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns',
      error: error.message
    });
  }
}