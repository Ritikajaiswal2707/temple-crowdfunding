// pages/api/create-proper-temples.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import Temple from '../../models/Temple';
import Campaign from '../../models/Campaign';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    console.log('✅ Connected to database');
    
    // Get or create sample user
    const hashedPassword = bcrypt.hashSync('password123', 12);
    let sampleUser = await User.findOne({ email: 'admin@temples.com' });
    
    if (!sampleUser) {
      sampleUser = await User.create({
        name: 'Temple Administrator',
        email: 'admin@temples.com',
        password: hashedPassword,
        role: 'temple_admin',
        verified: true
      });
    }

    // Delete old sample data first
    await Campaign.deleteMany({ title: { $in: ['Temple Renovation Fund'] } });
    await Temple.deleteMany({ name: { $in: ['Sample Temple'] } });

    // Create authentic Hindu temple data
    const templeData = [
      {
        name: 'Shri Ganesh Mandir',
        description: 'Ancient Ganesha temple known for removing obstacles and blessing devotees',
        location: {
          address: 'Temple Street, Old City',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        },
        deity: 'Lord Ganesha',
        campaign: {
          title: 'Ganesh Temple Restoration Project',
          description: 'Help restore this 200-year-old Ganesha temple. The main sanctum needs renovation, and we want to preserve the beautiful traditional stone carvings for future generations.',
          category: 'renovation',
          goalAmount: 150000,
          raisedAmount: 47000,
          donorCount: 28,
          images: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&q=80', // Beautiful Hindu temple
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'  // Temple interior with deity
          ]
        }
      },
      {
        name: 'Hanuman Ji Mandir',
        description: 'Sacred temple dedicated to Lord Hanuman, protector and devotee of Lord Rama',
        location: {
          address: 'Bhakti Marg, Temple Complex',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001'
        },
        deity: 'Lord Hanuman',
        campaign: {
          title: 'Hanuman Temple Kitchen Modernization',
          description: 'Upgrade our temple kitchen facilities to serve fresh prasadam to thousands of daily visitors. The new kitchen will have modern equipment while maintaining traditional cooking methods.',
          category: 'renovation',
          goalAmount: 95000,
          raisedAmount: 38000,
          donorCount: 22,
          images: [
            'https://images.unsplash.com/photo-1588013273468-315900bafd4d?w=800&h=600&fit=crop&q=80', // Traditional temple architecture
            'https://images.unsplash.com/photo-1582608159662-b7ec1d123a1a?w=800&h=600&fit=crop&q=80'  // Temple with devotees
          ]
        }
      },
      {
        name: 'Lakshmi Narayan Temple',
        description: 'Beautiful temple complex devoted to Goddess Lakshmi and Lord Vishnu',
        location: {
          address: 'Sacred Grove, Temple Town',
          city: 'Varanasi',
          state: 'Uttar Pradesh',
          pincode: '221001'
        },
        deity: 'Lakshmi Narayan',
        campaign: {
          title: 'New Community Hall Construction',
          description: 'Build a spacious community hall for religious gatherings, cultural programs, and educational activities. This will serve our growing community of devotees.',
          category: 'construction',
          goalAmount: 200000,
          raisedAmount: 85000,
          donorCount: 45,
          images: [
            'https://images.unsplash.com/photo-1520637736862-4d197d17c13a?w=800&h=600&fit=crop&q=80', // Temple complex
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80'  // Temple pillars and architecture
          ]
        }
      }
    ];

    const createdData = [];

    for (const templeInfo of templeData) {
      console.log(`Creating ${templeInfo.name}...`);
      
      // Create temple
      const temple = await Temple.create({
        name: templeInfo.name,
        description: templeInfo.description,
        location: templeInfo.location,
        deity: templeInfo.deity,
        admin: sampleUser._id,
        verified: true
      });

      // Create campaign
      const campaign = await Campaign.create({
        title: templeInfo.campaign.title,
        description: templeInfo.campaign.description,
        temple: temple._id,
        creator: sampleUser._id,
        category: templeInfo.campaign.category,
        goalAmount: templeInfo.campaign.goalAmount,
        raisedAmount: templeInfo.campaign.raisedAmount,
        status: 'active',
        featured: true,
        donorCount: templeInfo.campaign.donorCount,
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
        images: templeInfo.campaign.images
      });

      createdData.push({
        temple: { 
          id: temple._id, 
          name: temple.name,
          city: temple.location.city,
          deity: temple.deity
        },
        campaign: { 
          id: campaign._id, 
          title: campaign.title,
          progress: Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
          raised: campaign.raisedAmount,
          goal: campaign.goalAmount,
          donors: campaign.donorCount
        }
      });

      console.log(`✅ Created ${templeInfo.name} with campaign`);
    }
    
    res.status(200).json({
      success: true,
      message: 'Authentic Hindu temple data created successfully!',
      count: createdData.length,
      data: createdData
    });
    
  } catch (error) {
    console.error('❌ Temple data creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create temple data',
      error: error.message
    });
  }
}
