#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🏛️ Creating Mock Mode Environment...\n');

const envContent = `# Database Configuration (Mock Mode - Not Required)
MONGODB_URI=mongodb://localhost:27017/temple-crowdfunding

# NextAuth Configuration
NEXTAUTH_SECRET=${crypto.randomBytes(32).toString('base64')}
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Mock Mode - Not Required)
GOOGLE_CLIENT_ID=mock-google-client-id
GOOGLE_CLIENT_SECRET=mock-google-client-secret

# Razorpay Configuration (Mock Mode - Not Required)
RAZORPAY_KEY_ID=mock-razorpay-key-id
RAZORPAY_KEY_SECRET=mock-razorpay-key-secret

# Public Razorpay Key (for frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=mock-razorpay-key-id

# Development Mode
NODE_ENV=development

# Mock Mode (set to true to use mock data instead of real APIs)
MOCK_MODE=true
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully with Mock Mode enabled!');
  console.log('🚀 You can now run: npm run dev');
  console.log('🌐 Open: http://localhost:3000');
  console.log('\n💡 Mock Mode Features:');
  console.log('   - Sample temple campaigns');
  console.log('   - Simulated payment flow');
  console.log('   - Mock authentication');
  console.log('   - AI chat responses');
  console.log('   - No real API keys required!');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  console.log('\n📝 Please create .env.local manually with the following content:');
  console.log(envContent);
}
