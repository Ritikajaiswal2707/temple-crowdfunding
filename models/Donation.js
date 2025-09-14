// models/Donation.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'bank_transfer', 'cash']
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  message: String,
  receiptGenerated: {
    type: Boolean,
    default: false
  },
  taxDeductible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);
