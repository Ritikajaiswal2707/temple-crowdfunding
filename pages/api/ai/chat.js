// pages/api/ai/chat.js
import { isMockMode, mockChatResponse } from '../../../lib/mockMode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if mock mode is enabled
    if (isMockMode()) {
      const mockResult = await mockChatResponse(message);
      return res.status(200).json(mockResult);
    }

    // Simple AI responses for temple crowdfunding queries
    const responses = {
      greeting: [
        "Namaste! I'm here to help you with temple crowdfunding. How can I assist you today?",
        "Hello! Welcome to our temple crowdfunding platform. What would you like to know?",
        "Greetings! I'm your AI assistant for temple preservation. How may I help you?"
      ],
      donation: [
        "Donations help preserve our sacred temples and maintain their spiritual significance for future generations.",
        "Your contribution supports temple renovations, festivals, and daily operations. Every rupee makes a difference!",
        "Donations are used for temple maintenance, restoration work, and supporting the community. Thank you for your generosity!"
      ],
      campaign: [
        "To create a campaign, you need to provide temple details, fundraising goals, and campaign description. Visit our create campaign page to get started.",
        "Campaigns help raise funds for specific temple needs like renovations, festivals, or equipment. You can create one by clicking the 'Create Campaign' button.",
        "Creating a campaign is easy! Just fill out the form with temple information, set your fundraising goal, and share your story with potential donors."
      ],
      temple: [
        "Temples are sacred places of worship that connect us to our spiritual heritage. They need our support to remain vibrant centers of community life.",
        "Our platform supports temples across India, helping with renovations, festivals, and daily operations to preserve our cultural heritage.",
        "Temples serve as spiritual centers and community gathering places. Your support helps maintain their beauty and significance."
      ],
      payment: [
        "We use Razorpay for secure payment processing. All transactions are encrypted and secure. You can donate using cards, UPI, or net banking.",
        "Payments are processed securely through Razorpay. You'll receive a receipt for your donation, and it may be tax-deductible.",
        "Our payment system is secure and supports multiple payment methods. All donations are processed safely through Razorpay."
      ],
      default: [
        "I understand you're interested in temple crowdfunding. Could you please be more specific about what you'd like to know?",
        "That's an interesting question about temple crowdfunding. Let me help you with more specific information.",
        "I'm here to help with temple crowdfunding questions. Please let me know what specific information you need."
      ]
    };

    // Enhanced keyword-based response selection with context
    const lowerMessage = message.toLowerCase();
    let responseCategory = 'default';
    let suggestions = [];
    let relatedCampaigns = [];

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      responseCategory = 'greeting';
      suggestions = ['How to create a campaign?', 'Browse temple campaigns', 'Learn about donations'];
    } else if (lowerMessage.includes('donate') || lowerMessage.includes('donation') || lowerMessage.includes('money')) {
      responseCategory = 'donation';
      suggestions = ['Payment methods', 'Tax benefits', 'Browse campaigns'];
      relatedCampaigns = [
        { id: '1', title: 'Shri Krishna Temple Renovation', progress: 75 },
        { id: '2', title: 'Ancient Shiva Temple Restoration', progress: 45 }
      ];
    } else if (lowerMessage.includes('campaign') || lowerMessage.includes('create') || lowerMessage.includes('start')) {
      responseCategory = 'campaign';
      suggestions = ['Campaign requirements', 'Best practices', 'Success tips'];
    } else if (lowerMessage.includes('temple') || lowerMessage.includes('mandir') || lowerMessage.includes('worship')) {
      responseCategory = 'temple';
      suggestions = ['Temple preservation', 'Browse campaigns', 'Success stories'];
      relatedCampaigns = [
        { id: '1', title: 'Shri Krishna Temple Renovation', progress: 75 },
        { id: '2', title: 'Ancient Shiva Temple Restoration', progress: 45 }
      ];
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('razorpay')) {
      responseCategory = 'payment';
      suggestions = ['Payment security', 'Refund policy', 'Tax benefits'];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
      responseCategory = 'default';
      suggestions = ['Getting started', 'Platform features', 'Contact support'];
    }

    // Select random response from category
    const categoryResponses = responses[responseCategory];
    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    // Add some helpful links based on the query
    let additionalInfo = '';
    if (responseCategory === 'campaign') {
      additionalInfo = '\n\nYou can create a campaign at: /campaigns/create';
    } else if (responseCategory === 'donation') {
      additionalInfo = '\n\nBrowse campaigns at: /campaigns';
    }

    const finalResponse = randomResponse + additionalInfo;

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    res.status(200).json({
      success: true,
      response: finalResponse,
      suggestions: suggestions,
      relatedCampaigns: relatedCampaigns,
      timestamp: new Date().toISOString(),
      context: {
        messageType: lowerMessage.includes('?') ? 'question' : 'statement',
        hasTempleKeywords: lowerMessage.includes('temple') || lowerMessage.includes('mandir'),
        hasCampaignKeywords: lowerMessage.includes('campaign') || lowerMessage.includes('fundraising'),
        responseCategory: responseCategory
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      response: "I'm experiencing some technical difficulties. Please try again in a moment."
    });
  }
}
