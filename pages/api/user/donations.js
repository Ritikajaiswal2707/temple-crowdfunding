// pages/api/user/donations.js
import dbConnect from '../../../lib/mongodb';
import Donation from '../../../models/Donation';
import Campaign from '../../../models/Campaign';
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

    const { limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get user donations with pagination
    const donations = await Donation.find({ 
      donor: session.user.id 
    })
      .populate('campaign', 'title images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalCount = await Donation.countDocuments({ 
      donor: session.user.id 
    });

    // Format donations for response
    const formattedDonations = donations.map(donation => ({
      id: donation._id,
      amount: donation.amount,
      currency: donation.currency,
      status: donation.status,
      anonymous: donation.anonymous,
      message: donation.message,
      paymentMethod: donation.paymentMethod,
      createdAt: donation.createdAt,
      campaign: {
        id: donation.campaign._id,
        title: donation.campaign.title,
        images: donation.campaign.images
      }
    }));

    res.status(200).json({
      success: true,
      donations: formattedDonations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCount,
        hasNext: skip + parseInt(limit) < totalCount,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Fetch user donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations',
      error: error.message
    });
  }
}
