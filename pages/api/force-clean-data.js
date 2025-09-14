// pages/api/force-clean-data.js
import dbConnect from '../../lib/mongodb';
import Campaign from '../../models/Campaign';
import Temple from '../../models/Temple';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    console.log('🧹 Starting complete data cleanup...');
    
    // Delete ALL existing data
    const deletedCampaigns = await Campaign.deleteMany({});
    const deletedTemples = await Temple.deleteMany({});
    console.log(`Deleted ${deletedCampaigns.deletedCount} campaigns and ${deletedTemples.deletedCount} temples`);
    
    // Create fresh admin user
    await User.deleteMany({ email: 'temples@admin.com' });
    const hashedPassword = bcrypt.hashSync('password123', 12);
    const adminUser = await User.create({
      name: 'Temple Admin',
      email: 'temples@admin.com',
      password: hashedPassword,
      role: 'temple_admin',
      verified: true
    });
    
    // Create 3 authentic Hindu temples with proper images
    const properTempleData = [
      {
        name: 'Shri Ganesha Temple',
        description: 'Ancient temple dedicated to Lord Ganesha, the remover of obstacles',
        location: {
          address: 'Temple Road, Parel',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400012'
        },
        deity: 'Lord Ganesha',
        campaign: {
          title: 'Ganesha Temple Restoration',
          description: 'Help restore this historic Ganesha temple with beautiful traditional architecture and intricate stone carvings that have served devotees for over 150 years.',
          goalAmount: 125000,
          raisedAmount: 38500,
          donorCount: 24,
          images: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop', // Hindu temple
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'  // Temple deity
          ]
        }
      },
      {
        name: 'Hanuman Mandir',
        description: 'Sacred temple of Lord Hanuman, beloved by devotees across Rajasthan',
        location: {
          address: 'Hanuman Gali, Pink City',
          city: 'Jaipur', 
          state: 'Rajasthan',
          pincode: '302001'
        },
        deity: 'Lord Hanuman',
        campaign: {
          title: 'Hanuman Temple Kitchen Upgrade',
          description: 'Modernize our temple kitchen to serve fresh, hygienic prasadam to thousands of devotees who visit daily for Lord Hanuman\'s blessings.',
          goalAmount: 85000,
          raisedAmount: 34000,
          donorCount: 18,
          images: [
            'https://images.unsplash.com/photo-1588013273468-315900bafd4d?w=800&h=600&fit=crop', // Traditional temple
            'https://images.unsplash.com/photo-1582608159662-b7ec1d123a1a?w=800&h=600&fit=crop'  // Temple architecture
          ]
        }
      },
      {
        name: 'Vishnu Lakshmi Temple',
        description: 'Beautiful temple complex devoted to Lord Vishnu and Goddess Lakshmi',
        location: {
          address: 'Ghats Road, Old City',
          city: 'Varanasi',
          state: 'Uttar Pradesh', 
          pincode: '221001'
        },
        deity: 'Vishnu Lakshmi',
        campaign: {
          title: 'Community Prayer Hall Construction',
          description: 'Build a spacious prayer hall for religious ceremonies, festivals, and community gatherings in this holy city on the banks of Ganga.',
          goalAmount: 180000,
          raisedAmount: 72000,
          donorCount: 36,
          images: [
            'https://images.unsplash.com/photo-1520637736862-4d197d17c13a?w=800&h=600&fit=crop', // Temple complex
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'  // Temple pillars
          ]
        }
      }
    ];
    
    const createdData = [];
    
    for (const templeInfo of properTempleData) {
      console.log(`Creating ${templeInfo.name}...`);
      
      // Create temple
      const temple = await Temple.create({
        name: templeInfo.name,
        description: templeInfo.description,
        location: templeInfo.location,
        deity: templeInfo.deity,
        admin: adminUser._id,
        verified: true
      });
      
      // Create campaign
      const campaign = await Campaign.create({
        title: templeInfo.campaign.title,
        description: templeInfo.campaign.description,
        temple: temple._id,
        creator: adminUser._id,
        category: 'renovation',
        goalAmount: templeInfo.campaign.goalAmount,
        raisedAmount: templeInfo.campaign.raisedAmount,
        status: 'active',
        featured: true,
        donorCount: templeInfo.campaign.donorCount,
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        images: templeInfo.campaign.images
      });
      
      createdData.push({
        temple: temple.name,
        campaign: campaign.title,
        progress: Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
        images: campaign.images
      });
      
      console.log(`✅ Created ${temple.name} with campaign`);
    }
    
    res.status(200).json({
      success: true,
      message: 'All data cleaned and fresh Hindu temple data created!',
      created: createdData
    });
    
  } catch (error) {
    console.error('❌ Force clean error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clean and create data',
      error: error.message
    });
  }
}