// pages/api/fix-broken-images.js
import dbConnect from '../../lib/mongodb';
import Campaign from '../../models/Campaign';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Working Hindu temple image URLs (tested)
    const workingTempleImages = {
      'Ganesha Temple Restoration': [
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      ],
      'Hanuman Temple Kitchen Upgrade': [
        'https://images.unsplash.com/photo-1588013273468-315900bafd4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606145834519-46148ac2a5e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      ],
      'Community Prayer Hall Construction': [
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1604068549936-65eea7f76e97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      ]
    };
    
    const updates = [];
    
    for (const [campaignTitle, newImages] of Object.entries(workingTempleImages)) {
      const campaign = await Campaign.findOneAndUpdate(
        { title: campaignTitle },
        { images: newImages },
        { new: true }
      ).populate('temple', 'name');
      
      if (campaign) {
        updates.push({
          title: campaign.title,
          temple: campaign.temple?.name,
          newImages: newImages,
          status: 'updated'
        });
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Fixed ${updates.length} campaigns with working temple images`,
      updates: updates
    });
    
  } catch (error) {
    console.error('Fix broken images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix images',
      error: error.message
    });
  }
}