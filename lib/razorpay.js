// lib/razorpay.js
import Razorpay from 'razorpay';

// Initialize Razorpay instance
export const initializeRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Create a new order
export const createOrder = async (amount, currency = 'INR', receipt = null) => {
  try {
    const razorpay = initializeRazorpay();
    
    const options = {
      amount: amount * 100, // Convert to paisa
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
};

// Verify payment signature
export const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const crypto = require('crypto');
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    return expectedSignature === razorpay_signature;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

// Get payment details
export const getPaymentDetails = async (paymentId) => {
  try {
    const razorpay = initializeRazorpay();
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
};

// Refund payment
export const refundPayment = async (paymentId, amount = null, notes = {}) => {
  try {
    const razorpay = initializeRazorpay();
    
    const refundOptions = {
      payment_id: paymentId,
      notes: notes,
    };

    if (amount) {
      refundOptions.amount = amount * 100; // Convert to paisa
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);
    return refund;
  } catch (error) {
    console.error('Error processing refund:', error);
    throw new Error('Failed to process refund');
  }
};

// Get order details
export const getOrderDetails = async (orderId) => {
  try {
    const razorpay = initializeRazorpay();
    const order = await razorpay.orders.fetch(orderId);
    return order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error('Failed to fetch order details');
  }
};

// Check if Razorpay is configured
export const isRazorpayConfigured = () => {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
};

// Get Razorpay configuration for frontend
export const getRazorpayConfig = () => {
  return {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    isConfigured: isRazorpayConfigured()
  };
};

export default {
  initializeRazorpay,
  createOrder,
  verifyPayment,
  getPaymentDetails,
  refundPayment,
  getOrderDetails,
  isRazorpayConfigured,
  getRazorpayConfig
};
