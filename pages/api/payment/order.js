// pages/api/payment/order.js
import Razorpay from "razorpay";
import { isMockMode, mockPaymentOrder } from "../../../lib/mockMode";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount required" });
    }

    // Check if mock mode is enabled
    if (isMockMode()) {
      const mockOrder = await mockPaymentOrder(amount);
      return res.status(200).json(mockOrder);
    }

    // Check if Razorpay keys are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ 
        error: "Razorpay configuration missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables or enable MOCK_MODE=true" 
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // convert to paisa
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
