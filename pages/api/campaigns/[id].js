// pages/api/campaigns/[id].js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import Temple from '../../../models/Temple';
import User from '../../../models/User';
import { isMockMode, mockCampaignApi } from '../../../lib/mockMode';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if mock mode is enabled
  if (isMockMode()) {
    try {
      const result = await mockCampaignApi(id);
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Mock API error',
        error: error.message
      });
    }
  }

  try {
    await dbConnect();

    const campaign = await Campaign.findById(id)
      .populate('temple', 'name location deity images')
      .populate('creator', 'name email');

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Calculate progress percentage
    const progress = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
    const remainingAmount = campaign.goalAmount - campaign.raisedAmount;
    const daysLeft = campaign.deadline ? Math.max(0, Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))) : null;

    const campaignData = {
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
      updates: campaign.updates,
      milestones: campaign.milestones,
      temple: {
        name: campaign.temple?.name || 'Unknown Temple',
        location: campaign.temple?.location || {},
        deity: campaign.temple?.deity || 'Divine',
        images: campaign.temple?.images || []
      },
      creator: {
        name: campaign.creator?.name || 'Anonymous',
        email: campaign.creator?.email || ''
      },
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt
    };

    res.status(200).json({
      success: true,
      campaign: campaignData
    });

  } catch (error) {
    console.error('Fetch campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign',
      error: error.message
    });
  }
}