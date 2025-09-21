// pages/api/user/stats.js
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Campaign from '../../../models/Campaign';
import Donation from '../../../models/Donation';
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

    // Get user stats
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get campaign count
    const campaignsCreated = await Campaign.countDocuments({ 
      creator: session.user.id 
    });

    // Get donation stats
    const donations = await Donation.find({ 
      donor: session.user.id,
      status: 'completed'
    });

    const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const donationCount = donations.length;

    res.status(200).json({
      success: true,
      totalDonated,
      donationCount,
      campaignsCreated,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified
      }
    });

  } catch (error) {
    console.error('Fetch user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user stats',
      error: error.message
    });
  }
}
