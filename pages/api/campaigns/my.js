// pages/api/campaigns/my.js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import Temple from '../../../models/Temple';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    await dbConnect();

    const campaigns = await Campaign.find({ creator: session.user.id })
      .populate('temple', 'name location deity images')
      .populate('creator', 'name')
      .sort({ createdAt: -1 });

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
    console.error('Fetch my campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns',
      error: error.message
    });
  }
}
