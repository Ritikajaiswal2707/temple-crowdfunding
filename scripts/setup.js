#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🏛️ Temple Crowdfunding Platform Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  console.log('📝 Creating .env.local file...');
  
  // Read example file
  let envContent = '';
  if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf8');
  } else {
    // Create basic env content
    envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/temple-crowdfunding

# NextAuth Configuration
NEXTAUTH_SECRET=${crypto.randomBytes(32).toString('base64')}
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional - for Google Sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay Configuration (Required for payments)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Public Razorpay Key (for frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# Development Mode
NODE_ENV=development

# Mock Mode (set to true to use mock data instead of real APIs)
MOCK_MODE=true
`;
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies already installed');
} else {
  console.log('📦 Installing dependencies...');
  console.log('   Run: npm install');
}

console.log('\n🚀 Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Run: npm install (if not already done)');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
console.log('\n💡 Mock Mode is enabled by default - no API keys required!');
console.log('   Check SETUP_GUIDE.md for production setup instructions.');
console.log('\n🎉 Happy coding!');
