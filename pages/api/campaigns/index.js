// pages/api/campaigns/index.js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import Temple from '../../../models/Temple';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { featured, limit = 10, status = 'active' } = req.query;
      
      let query = { status };
      if (featured === 'true') {
        query.featured = true;
      }
      
      const campaigns = await Campaign.find(query)
        .populate('temple', 'name location deity images')
        .populate('creator', 'name')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));
      
      // Calculate progress percentage for each campaign
      const campaignsWithProgress = campaigns.map(campaign => {
        const progress = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
        const remainingAmount = campaign.goalAmount - campaign.raisedAmount;
        const daysLeft = campaign.deadline ? Math.max(0, Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))) : null;
        
        return {
          id: campaign._id,
          title: campaign.title,
          description: campaign.description,
          goalAmount: campaign.goalAmount,
          raisedAmount: campaign.raisedAmount,
          progress,
          remainingAmount,
          donorCount: campaign.donorCount,
          category: campaign.category,
          status: campaign.status,
          featured: campaign.featured,
          images: campaign.images,
          deadline: campaign.deadline,
          daysLeft,
          temple: {
            name: campaign.temple?.name || 'Unknown Temple',
            location: campaign.temple?.location || {},
            deity: campaign.temple?.deity || 'Divine'
          },
          creator: {
            name: campaign.creator?.name || 'Anonymous'
          },
          createdAt: campaign.createdAt,
          updatedAt: campaign.updatedAt
        };
      });
      
      res.status(200).json({
        success: true,
        campaigns: campaignsWithProgress,
        count: campaignsWithProgress.length
      });
      
    } catch (error) {
      console.error('Fetch campaigns error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch campaigns',
        error: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}