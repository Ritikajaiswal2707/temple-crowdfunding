// pages/api/campaigns/donate.js
import dbConnect from '../../../lib/mongodb';
import Donation from '../../../models/Donation';
import Campaign from '../../../models/Campaign';
import User from '../../../models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { isMockMode, mockPaymentVerification } from '../../../lib/mockMode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

    const { campaignId, amount, message, anonymous } = req.body;

    if (!campaignId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Campaign ID and amount are required'
      });
    }

    // Check if mock mode is enabled
    if (isMockMode()) {
      const mockResult = await mockPaymentVerification({ 
        amount, 
        campaignId, 
        donorInfo: {
          name: anonymous ? 'Anonymous' : session.user.name,
          email: session.user.email,
          message: message || ''
        }
      });
      return res.status(200).json(mockResult);
    }

    await dbConnect();

    // Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Find the user
    const user = await User.findById(session.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create donation record
    const donation = new Donation({
      donor: user._id,
      campaign: campaignId,
      amount: parseFloat(amount),
      currency: 'INR',
      paymentMethod: 'razorpay',
      status: 'completed',
      anonymous: anonymous || false,
      message: message || '',
      taxDeductible: true
    });

    await donation.save();

    // Update campaign raised amount and donor count
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { 
        raisedAmount: parseFloat(amount),
        donorCount: 1
      }
    });

    // Update user donation stats
    await User.findByIdAndUpdate(user._id, {
      $inc: { 
        totalDonated: parseFloat(amount),
        donationCount: 1
      }
    });

    res.status(200).json({
      success: true,
      message: 'Donation recorded successfully',
      donation: {
        id: donation._id,
        amount: donation.amount,
        status: donation.status,
        campaignTitle: campaign.title
      }
    });

  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process donation',
      error: error.message
    });
  }
}
