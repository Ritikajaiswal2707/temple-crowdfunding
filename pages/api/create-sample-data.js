// pages/api/create-sample-data.js
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
    
    // Create a sample user (check if exists first)
    const hashedPassword = bcrypt.hashSync('password123', 12);
    
    let sampleUser = await User.findOne({ email: 'sample@temple.com' });
    if (!sampleUser) {
      console.log('Creating sample user...');
      sampleUser = await User.create({
        name: 'Sample Temple Admin',
        email: 'sample@temple.com',
        password: hashedPassword,
        role: 'temple_admin',
        verified: true
      });
      console.log('✅ Sample user created');
    } else {
      console.log('Sample user already exists');
    }
    
    // Create a sample temple
    let sampleTemple = await Temple.findOne({ name: 'Sample Temple' });
    if (!sampleTemple) {
      console.log('Creating sample temple...');
      sampleTemple = await Temple.create({
        name: 'Sample Temple',
        description: 'A beautiful temple for community worship',
        location: {
          address: '123 Temple Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        },
        deity: 'Lord Ganesha',
        admin: sampleUser._id,
        verified: true
      });
      console.log('✅ Sample temple created');
    } else {
      console.log('Sample temple already exists');
    }
    
    // Create a sample campaign
    let sampleCampaign = await Campaign.findOne({ title: 'Temple Renovation Fund' });
    if (!sampleCampaign) {
      console.log('Creating sample campaign...');
      sampleCampaign = await Campaign.create({
        title: 'Temple Renovation Fund',
        description: 'Help us renovate the main prayer hall and restore the beautiful architecture of our beloved temple.',
        temple: sampleTemple._id,
        creator: sampleUser._id,
        category: 'renovation',
        goalAmount: 100000,
        raisedAmount: 25000,
        status: 'active',
        featured: true,
        donorCount: 15,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        images: [
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop', // Hindu temple
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop'  // Temple architecture
        ]
      });
      console.log('✅ Sample campaign created');
    } else {
      console.log('Sample campaign already exists');
    }
    
    res.status(200).json({
      success: true,
      message: 'Sample data created successfully!',
      data: {
        user: { 
          id: sampleUser._id, 
          name: sampleUser.name,
          email: sampleUser.email,
          role: sampleUser.role
        },
        temple: { 
          id: sampleTemple._id, 
          name: sampleTemple.name,
          city: sampleTemple.location.city
        },
        campaign: { 
          id: sampleCampaign._id, 
          title: sampleCampaign.title,
          goalAmount: sampleCampaign.goalAmount,
          raisedAmount: sampleCampaign.raisedAmount,
          progress: Math.round((sampleCampaign.raisedAmount / sampleCampaign.goalAmount) * 100)
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Sample data creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sample data',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}