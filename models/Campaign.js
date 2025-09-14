// models/Campaign.js
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['renovation', 'construction', 'festival', 'daily_operations', 'charity', 'equipment'],
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  raisedAmount: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  deadline: Date,
  images: [String],
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  donorCount: {
    type: Number,
    default: 0
  },
  updates: [{
    title: String,
    description: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  milestones: [{
    amount: Number,
    description: String,
    achieved: {
      type: Boolean,
      default: false
    },
    achievedAt: Date
  }]
}, {
  timestamps: true
});

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);