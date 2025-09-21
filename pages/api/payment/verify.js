// pages/api/payment/verify.js
import Razorpay from "razorpay";
import crypto from "crypto";
import dbConnect from '../../../lib/mongodb';
import Donation from '../../../models/Donation';
import Campaign from '../../../models/Campaign';
import User from '../../../models/User';
import { isMockMode, mockPaymentVerification } from '../../../lib/mockMode';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaignId,
      amount,
      donorInfo
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment verification data" });
    }

    // Check if mock mode is enabled
    if (isMockMode()) {
      const mockResult = await mockPaymentVerification({ amount, campaignId, donorInfo });
      return res.status(200).json(mockResult);
    }

    // Check if Razorpay keys are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ 
        error: "Razorpay configuration missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables or enable MOCK_MODE=true" 
      });
    }

    // Verify the payment signature
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    await dbConnect();

    // Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // Find or create donor user
    let donor = await User.findOne({ email: donorInfo.email });
    if (!donor) {
      donor = new User({
        name: donorInfo.name,
        email: donorInfo.email,
        role: 'donor'
      });
      await donor.save();
    }

    // Create donation record
    const donation = new Donation({
      donor: donor._id,
      campaign: campaignId,
      amount: parseFloat(amount),
      currency: 'INR',
      paymentMethod: 'razorpay',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'completed',
      anonymous: donorInfo.name === 'Anonymous',
      message: donorInfo.message || '',
      taxDeductible: true
    });

    await donation.save();

    // Update campaign raised amount and donor count
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { 
        raisedAmount: parseFloat(amount),
        donorCount: 1
      }
    });

    // Update user donation stats
    await User.findByIdAndUpdate(donor._id, {
      $inc: { 
        totalDonated: parseFloat(amount),
        donationCount: 1
      }
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and donation recorded successfully",
      donation: {
        id: donation._id,
        amount: donation.amount,
        status: donation.status,
        campaignTitle: campaign.title
      }
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      error: "Payment verification failed",
      details: error.message 
    });
  }
}