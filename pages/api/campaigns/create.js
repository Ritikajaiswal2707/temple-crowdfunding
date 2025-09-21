// pages/api/campaigns/create.js
import dbConnect from '../../../lib/mongodb';
import Campaign from '../../../models/Campaign';
import Temple from '../../../models/Temple';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

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

    await dbConnect();

    const {
      title,
      description,
      category,
      goalAmount,
      deadline,
      templeName,
      templeLocation,
      templeCity,
      templeState,
      templeDeity,
      images
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !goalAmount || !templeName || !templeLocation) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create or find temple
    let temple = await Temple.findOne({
      name: templeName,
      'location.address': templeLocation
    });

    if (!temple) {
      temple = new Temple({
        name: templeName,
        description: `Temple dedicated to ${templeDeity || 'divine worship'}`,
        location: {
          address: templeLocation,
          city: templeCity,
          state: templeState
        },
        deity: templeDeity,
        admin: session.user.id,
        verified: false
      });
      await temple.save();
    }

    // Create campaign
    const campaign = new Campaign({
      title,
      description,
      temple: temple._id,
      creator: session.user.id,
      category,
      goalAmount: parseFloat(goalAmount),
      deadline: deadline ? new Date(deadline) : null,
      images: images || [],
      status: 'pending' // New campaigns start as pending for review
    });

    await campaign.save();

    // Populate the response
    await campaign.populate('temple', 'name location deity');
    await campaign.populate('creator', 'name');

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign: {
        id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        category: campaign.category,
        goalAmount: campaign.goalAmount,
        raisedAmount: campaign.raisedAmount,
        status: campaign.status,
        images: campaign.images,
        deadline: campaign.deadline,
        temple: {
          name: campaign.temple.name,
          location: campaign.temple.location,
          deity: campaign.temple.deity
        },
        creator: {
          name: campaign.creator.name
        },
        createdAt: campaign.createdAt
      }
    });

  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create campaign',
      error: error.message
    });
  }
}
