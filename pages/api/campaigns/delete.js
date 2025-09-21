// pages/api/campaigns/delete.js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
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
        message: 'You can only delete your own campaigns'
      });
    }

    // Check if campaign has received donations
    if (campaign.raisedAmount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete campaign that has received donations'
      });
    }

    // Delete the campaign
    await Campaign.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully'
    });

  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete campaign',
      error: error.message
    });
  }
}
