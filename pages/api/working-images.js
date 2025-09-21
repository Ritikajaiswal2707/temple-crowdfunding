// pages/api/working-images.js
import dbConnect from '../../lib/mongodb';
import Campaign from '../../models/Campaign';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Using Picsum (reliable image service) with temple-appropriate nature/architecture images
    const workingImages = {
      'Ganesha Temple Restoration': [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2'
      ],
      'Hanuman Temple Kitchen Upgrade': [
        'https://picsum.photos/800/600?random=3', 
        'https://picsum.photos/800/600?random=4'
      ],
      'Community Prayer Hall Construction': [
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=6'
      ]
    };
    
    const updates = [];
    
    for (const [title, images] of Object.entries(workingImages)) {
      const campaign = await Campaign.findOneAndUpdate(
        { title },
        { images },
        { new: true }
      );
      
      if (campaign) {
        updates.push({ title, imageCount: images.length });
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Updated ${updates.length} campaigns with working images`,
      updates
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update images',
      error: error.message
    });
  }
}