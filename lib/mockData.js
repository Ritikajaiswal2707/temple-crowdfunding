// lib/mockData.js - Mock data for development without API keys

export const mockUsers = [
  {
    _id: 'mock-user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'donor',
    totalDonated: 5000,
    donationCount: 3,
    verified: true
  },
  {
    _id: 'mock-user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'temple_admin',
    totalDonated: 0,
    donationCount: 0,
    verified: true
  }
];

export const mockTemples = [
  {
    _id: 'mock-temple-1',
    name: 'Shri Kashi Vishwanath Temple',
    description: 'Ancient temple dedicated to Lord Shiva',
    location: {
      address: 'Vishwanath Gali, Varanasi',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001'
    },
    deity: 'Lord Shiva',
    verified: true,
    images: ['https://upload.wikimedia.org/wikipedia/commons/3/3a/Kashi_Vishwanath_Temple.jpg']
  },
  {
    _id: 'mock-temple-2',
    name: 'Tirumala Venkateswara Temple',
    description: 'Sacred temple of Lord Venkateswara',
    location: {
      address: 'Tirumala, Tirupati',
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      pincode: '517504'
    },
    deity: 'Lord Venkateswara',
    verified: true,
    images: ['https://upload.wikimedia.org/wikipedia/commons/7/79/Tirumala_temple.jpg']
  }
];

export const mockCampaigns = [
  {
    _id: 'mock-campaign-1',
    title: 'Renovate Ancient Shiva Temple',
    description: 'Help restore the beautiful ancient Shiva temple that has been serving the community for over 500 years. The temple needs urgent repairs to its roof and walls. This sacred place of worship has been a beacon of faith for generations, and now it needs our collective support to preserve its spiritual legacy.',
    temple: mockTemples[0],
    creator: mockUsers[1],
    category: 'renovation',
    goalAmount: 500000,
    raisedAmount: 250000,
    donorCount: 45,
    status: 'active',
    featured: true,
    images: ['https://upload.wikimedia.org/wikipedia/commons/3/3a/Kashi_Vishwanath_Temple.jpg'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updates: [
      {
        title: 'Foundation Work Completed',
        description: 'The foundation repair work has been completed successfully. Next phase will focus on roof restoration.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Community Support Growing',
        description: 'We are overwhelmed by the community response. Thank you for your generous contributions!',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    _id: 'mock-campaign-2',
    title: 'Temple Festival Celebration',
    description: 'Support the annual temple festival that brings together thousands of devotees. Funds will be used for decorations, food, and cultural programs. This festival is a time of joy, devotion, and community bonding that strengthens our spiritual connection.',
    temple: mockTemples[1],
    creator: mockUsers[1],
    category: 'festival',
    goalAmount: 200000,
    raisedAmount: 150000,
    donorCount: 28,
    status: 'active',
    featured: true,
    images: ['https://upload.wikimedia.org/wikipedia/commons/7/79/Tirumala_temple.jpg'],
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updates: [
      {
        title: 'Festival Preparations Begin',
        description: 'The festival committee has started preparations. Decorations and arrangements are underway.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    _id: 'mock-campaign-3',
    title: 'Daily Operations Support',
    description: 'Help maintain the daily operations of the temple including electricity, water, and maintenance of the premises. Your contribution ensures the temple remains a welcoming place for all devotees.',
    temple: mockTemples[0],
    creator: mockUsers[1],
    category: 'daily_operations',
    goalAmount: 100000,
    raisedAmount: 75000,
    donorCount: 32,
    status: 'active',
    featured: false,
    images: ['https://images.pexels.com/photos/460680/pexels-photo-460680.jpeg'],
    deadline: null,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    updates: []
  },
  {
    _id: 'mock-campaign-4',
    title: 'New Temple Construction',
    description: 'Help build a new temple in a rural area where devotees have to travel long distances for worship. This temple will serve as a spiritual center for the local community.',
    temple: {
      _id: 'mock-temple-3',
      name: 'Shri Ram Temple',
      location: {
        address: 'Village Road, Rural Area',
        city: 'Rural District',
        state: 'Uttar Pradesh'
      },
      deity: 'Lord Rama'
    },
    creator: mockUsers[1],
    category: 'construction',
    goalAmount: 1000000,
    raisedAmount: 300000,
    donorCount: 67,
    status: 'active',
    featured: true,
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/49/Meenakshi_Amman_Temple.jpg'],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    updates: [
      {
        title: 'Land Acquisition Complete',
        description: 'The land for the new temple has been successfully acquired. Construction will begin soon.',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    _id: 'mock-campaign-5',
    title: 'Temple Equipment Fund',
    description: 'Support the purchase of essential equipment for the temple including sound systems, lighting, and ceremonial items. These improvements will enhance the worship experience for all devotees.',
    temple: mockTemples[1],
    creator: mockUsers[1],
    category: 'equipment',
    goalAmount: 150000,
    raisedAmount: 90000,
    donorCount: 23,
    status: 'active',
    featured: false,
    images: ['https://upload.wikimedia.org/wikipedia/commons/1/14/Kedarnath_Temple.jpg'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    updates: []
  }
];

export const mockDonations = [
  {
    _id: 'mock-donation-1',
    donor: mockUsers[0],
    campaign: mockCampaigns[0],
    amount: 1000,
    currency: 'INR',
    status: 'completed',
    anonymous: false,
    message: 'May Lord Shiva bless everyone',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'mock-donation-2',
    donor: mockUsers[0],
    campaign: mockCampaigns[1],
    amount: 2000,
    currency: 'INR',
    status: 'completed',
    anonymous: false,
    message: 'Happy to support the festival',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'mock-donation-3',
    donor: mockUsers[0],
    campaign: mockCampaigns[2],
    amount: 500,
    currency: 'INR',
    status: 'completed',
    anonymous: false,
    message: 'Supporting daily operations',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'mock-donation-4',
    donor: mockUsers[0],
    campaign: mockCampaigns[3],
    amount: 1500,
    currency: 'INR',
    status: 'completed',
    anonymous: false,
    message: 'Blessings for the new temple',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

// Mock API responses
export const mockApiResponses = {
  campaigns: {
    success: true,
    campaigns: mockCampaigns.map(campaign => ({
      id: campaign._id,
      title: campaign.title,
      description: campaign.description,
      goalAmount: campaign.goalAmount,
      raisedAmount: campaign.raisedAmount,
      progress: Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
      donorCount: campaign.donorCount,
      category: campaign.category,
      status: campaign.status,
      featured: campaign.featured,
      images: campaign.images,
      deadline: campaign.deadline,
      daysLeft: campaign.deadline ? Math.max(0, Math.ceil((campaign.deadline - new Date()) / (1000 * 60 * 60 * 24))) : null,
      temple: {
        name: campaign.temple.name,
        location: campaign.temple.location,
        deity: campaign.temple.deity
      },
      creator: {
        name: campaign.creator.name
      },
      createdAt: campaign.createdAt
    })),
    count: mockCampaigns.length
  },
  
  userStats: {
    success: true,
    totalDonated: 5000,
    donationCount: 4,
    campaignsCreated: 0
  },
  
  userDonations: {
    success: true,
    donations: mockDonations.map(donation => ({
      id: donation._id,
      amount: donation.amount,
      currency: donation.currency,
      status: donation.status,
      anonymous: donation.anonymous,
      message: donation.message,
      createdAt: donation.createdAt,
      campaign: {
        id: donation.campaign._id,
        title: donation.campaign.title,
        images: donation.campaign.images
      }
    })),
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: mockDonations.length,
      hasNext: false,
      hasPrev: false
    }
  }
};

// Mock payment response
export const mockPaymentResponse = {
  success: true,
  message: "Payment verified and donation recorded successfully (Mock Mode)",
  donation: {
    id: 'mock-donation-' + Date.now(),
    amount: 1000,
    status: 'completed',
    campaignTitle: 'Mock Campaign'
  }
};
