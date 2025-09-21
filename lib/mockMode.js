// lib/mockMode.js - Mock mode utilities

import { mockApiResponses, mockPaymentResponse } from './mockData';

// Check if mock mode is enabled
export const isMockMode = () => {
  return process.env.MOCK_MODE === 'true' || process.env.NODE_ENV === 'development';
};

// Mock API delay to simulate real API calls
export const mockDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock campaign API responses
export const mockCampaignsApi = async (query = {}) => {
  await mockDelay(500);
  
  let campaigns = mockApiResponses.campaigns.campaigns;
  
  // Apply filters
  if (query.featured === 'true') {
    campaigns = campaigns.filter(c => c.featured);
  }
  
  if (query.limit) {
    campaigns = campaigns.slice(0, parseInt(query.limit));
  }
  
  return {
    success: true,
    campaigns,
    count: campaigns.length
  };
};

// Mock individual campaign API
export const mockCampaignApi = async (id) => {
  await mockDelay(300);
  
  const campaign = mockApiResponses.campaigns.campaigns.find(c => c.id === id);
  
  if (!campaign) {
    return {
      success: false,
      message: 'Campaign not found'
    };
  }
  
  return {
    success: true,
    campaign
  };
};

// Mock user stats API
export const mockUserStatsApi = async () => {
  await mockDelay(400);
  return mockApiResponses.userStats;
};

// Mock user donations API
export const mockUserDonationsApi = async (query = {}) => {
  await mockDelay(400);
  
  let donations = mockApiResponses.userDonations.donations;
  
  if (query.limit) {
    donations = donations.slice(0, parseInt(query.limit));
  }
  
  return {
    success: true,
    donations,
    pagination: {
      ...mockApiResponses.userDonations.pagination,
      totalCount: donations.length
    }
  };
};

// Mock payment order creation
export const mockPaymentOrder = async (amount) => {
  await mockDelay(800);
  
  return {
    id: 'mock_order_' + Date.now(),
    amount: amount * 100, // Convert to paisa
    currency: 'INR',
    receipt: 'mock_receipt_' + Date.now(),
    status: 'created'
  };
};

// Mock payment verification
export const mockPaymentVerification = async (paymentData) => {
  await mockDelay(1000);
  
  // Simulate successful payment
  return {
    ...mockPaymentResponse,
    donation: {
      ...mockPaymentResponse.donation,
      amount: paymentData.amount,
      campaignTitle: 'Mock Campaign'
    }
  };
};

// Mock AI chat response
export const mockChatResponse = async (message) => {
  await mockDelay(1000);
  
  const responses = [
    "Namaste! I'm here to help you with temple crowdfunding. How can I assist you today?",
    "That's a great question about temple donations. Every contribution helps preserve our sacred heritage!",
    "I can help you understand how campaigns work, donation processes, or temple information. What would you like to know?",
    "Thank you for your interest in temple crowdfunding. Your support makes a real difference in preserving our cultural heritage."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    success: true,
    response: randomResponse,
    timestamp: new Date().toISOString()
  };
};

// Mock authentication
export const mockAuth = {
  signIn: async (credentials) => {
    await mockDelay(800);
    
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        user: {
          id: 'mock-user-1',
          name: 'Test User',
          email: 'test@example.com'
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  signUp: async (userData) => {
    await mockDelay(800);
    
    return {
      success: true,
      message: 'User created successfully (Mock Mode)',
      user: {
        id: 'mock-user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'donor'
      }
    };
  }
};

// Mock campaign creation
export const mockCreateCampaign = async (campaignData) => {
  await mockDelay(1000);
  
  return {
    success: true,
    message: 'Campaign created successfully (Mock Mode)',
    campaign: {
      id: 'mock-campaign-' + Date.now(),
      title: campaignData.title,
      description: campaignData.description,
      category: campaignData.category,
      goalAmount: campaignData.goalAmount,
      raisedAmount: 0,
      status: 'pending',
      images: campaignData.images || [],
      deadline: campaignData.deadline,
      temple: {
        name: campaignData.templeName,
        location: {
          address: campaignData.templeLocation,
          city: campaignData.templeCity,
          state: campaignData.templeState
        },
        deity: campaignData.templeDeity
      },
      creator: {
        name: 'Mock User'
      },
      createdAt: new Date()
    }
  };
};
