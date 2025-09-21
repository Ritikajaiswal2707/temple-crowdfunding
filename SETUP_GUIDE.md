# 🏛️ Temple Crowdfunding Platform - Setup Guide

## 🚀 Quick Start (Mock Mode - No API Keys Required)

For development and testing, you can run the platform in **Mock Mode** without any API keys:

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd temple-crowdfunding
npm install
```

### 2. Create Environment File
Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

### 3. Configure Mock Mode
Edit `.env.local` and set:
```env
MOCK_MODE=true
NODE_ENV=development
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random
```

### 4. Run the Application
```bash
npm run dev
```

The application will run at `http://localhost:3000` with mock data!

---

## 🔑 Production Setup (With Real API Keys)

### Required API Keys & Services

#### 1. **MongoDB Database** (Required)
- **Local MongoDB**: `mongodb://localhost:27017/temple-crowdfunding`
- **MongoDB Atlas** (Recommended): Get free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)

#### 2. **Razorpay Payment Gateway** (Required for payments)
- Sign up at [razorpay.com](https://razorpay.com)
- Get your API keys from Dashboard → Settings → API Keys
- Add to `.env.local`:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

#### 3. **Google OAuth** (Optional - for Google Sign-in)
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new project or select existing
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add to `.env.local`:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### 4. **NextAuth Secret** (Required)
Generate a random secret:
```bash
openssl rand -base64 32
```
Add to `.env.local`:
```env
NEXTAUTH_SECRET=your-generated-secret-here
```

### Complete Production Environment File
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/temple-crowdfunding

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Environment
NODE_ENV=production
MOCK_MODE=false
```

---

## 🛠️ Development Features

### Mock Mode Features
- ✅ **Campaigns**: Pre-loaded sample campaigns
- ✅ **Payments**: Simulated payment flow
- ✅ **Authentication**: Mock user system
- ✅ **AI Chat**: Predefined responses
- ✅ **Dashboard**: Sample user data

### Test Credentials (Mock Mode)
- **Email**: `test@example.com`
- **Password**: `password`

### Sample Data Included
- 3 sample temple campaigns
- 2 sample temples
- Mock donation history
- User statistics

---

## 🚀 Deployment Options

### 1. **Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```
- Automatic deployments from GitHub
- Built-in environment variable management
- Free tier available

### 2. **Netlify**
```bash
npm run build
# Upload dist folder to Netlify
```

### 3. **Railway**
```bash
# Connect GitHub repo to Railway
# Add environment variables in dashboard
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **MongoDB Connection Error**
```bash
# Check if MongoDB is running locally
mongod --version

# Or use MongoDB Atlas for cloud database
```

#### 2. **Razorpay Payment Error**
- Ensure API keys are correct
- Check if test mode is enabled
- Verify webhook URLs

#### 3. **NextAuth Error**
- Ensure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain

#### 4. **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📱 Features Overview

### ✅ **Implemented Features**
- User Authentication (Email/Password + Google OAuth)
- Campaign Management (Create, Edit, Delete, View)
- Payment Processing (Razorpay Integration)
- User Dashboard with Statistics
- AI Chat Assistant
- Responsive Design with Animations
- Dark Mode Toggle
- Mock Mode for Development

### 🎯 **Key Pages**
- `/` - Homepage with featured campaigns
- `/campaigns` - Browse all campaigns
- `/campaigns/create` - Create new campaign
- `/campaigns/[id]` - Campaign details
- `/dashboard` - User dashboard
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

### 🔐 **Security Features**
- Password hashing with bcrypt
- JWT-based authentication
- Payment signature verification
- Input validation and sanitization

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all environment variables are set correctly
3. Verify API keys are valid and active
4. Check browser console for client-side errors
5. Check server logs for backend errors

---

## 🎉 You're Ready!

Your temple crowdfunding platform is now ready to use! Start with mock mode for development, then add real API keys for production deployment.
