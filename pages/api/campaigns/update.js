// pages/api/campaigns/update.js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import Temple from '../../../models/Temple';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
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

    const { id } = req.query;
    const {
      title,
      description,
      category,
      goalAmount,
      deadline,
      status,
      images
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Campaign ID is required'
      });
    }

    // Find the campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if user is the creator or admin
    if (campaign.creator.toString() !== session.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own campaigns'
      });
    }

    // Update campaign fields
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (goalAmount) updateData.goalAmount = parseFloat(goalAmount);
    if (deadline) updateData.deadline = new Date(deadline);
    if (status) updateData.status = status;
    if (images) updateData.images = images;

    // Update the campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('temple', 'name location deity')
     .populate('creator', 'name');

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      campaign: {
        id: updatedCampaign._id,
        title: updatedCampaign.title,
        description: updatedCampaign.description,
        category: updatedCampaign.category,
        goalAmount: updatedCampaign.goalAmount,
        raisedAmount: updatedCampaign.raisedAmount,
        status: updatedCampaign.status,
        images: updatedCampaign.images,
        deadline: updatedCampaign.deadline,
        temple: {
          name: updatedCampaign.temple.name,
          location: updatedCampaign.temple.location,
          deity: updatedCampaign.temple.deity
        },
        creator: {
          name: updatedCampaign.creator.name
        },
        updatedAt: updatedCampaign.updatedAt
      }
    });

  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update campaign',
      error: error.message
    });
  }
}
