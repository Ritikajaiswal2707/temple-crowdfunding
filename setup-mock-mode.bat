@echo off
echo 🏛️ Temple Crowdfunding Platform - Mock Mode Setup
echo.

echo 📝 Creating .env.local file for Mock Mode...
echo.

(
echo # Database Configuration ^(Mock Mode - Not Required^)
echo MONGODB_URI=mongodb://localhost:27017/temple-crowdfunding
echo.
echo # NextAuth Configuration
echo NEXTAUTH_SECRET=mock-secret-key-for-development-only-not-for-production
echo NEXTAUTH_URL=http://localhost:3000
echo.
echo # Google OAuth ^(Mock Mode - Not Required^)
echo GOOGLE_CLIENT_ID=mock-google-client-id
echo GOOGLE_CLIENT_SECRET=mock-google-client-secret
echo.
echo # Razorpay Configuration ^(Mock Mode - Not Required^)
echo RAZORPAY_KEY_ID=mock-razorpay-key-id
echo RAZORPAY_KEY_SECRET=mock-razorpay-key-secret
echo.
echo # Public Razorpay Key ^(for frontend^)
echo NEXT_PUBLIC_RAZORPAY_KEY_ID=mock-razorpay-key-id
echo.
echo # Development Mode
echo NODE_ENV=development
echo.
echo # Mock Mode ^(set to true to use mock data instead of real APIs^)
echo MOCK_MODE=true
) > .env.local

echo ✅ .env.local created successfully with Mock Mode enabled!
echo.
echo 🚀 Next Steps:
echo 1. Run: npm install ^(if not already done^)
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo 💡 Mock Mode Features:
echo    - Sample temple campaigns
echo    - Simulated payment flow
echo    - Mock authentication
echo    - AI chat responses
echo    - No real API keys required!
echo.
echo 🎉 Setup Complete! Happy coding!
pause
