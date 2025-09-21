# 🏛️ Temple Crowdfunding Platform

**Live Demo:** [https://temple-crowdfunding-8o3g.vercel.app](https://temple-crowdfunding-8o3g.vercel.app/)  

A modern, responsive temple crowdfunding platform built with React.js, Next.js, and Tailwind CSS. Help preserve and restore ancient temples through community-driven fundraising.

## 🌟 Features

- **User Authentication:** Sign up and log in easily using email or Google OAuth
- **Campaign Management:** Create, edit, and delete temple renovation campaigns
- **Donation System:** Integrated with Razorpay for safe and seamless payments
- **Interactive Dashboard:** Browse campaigns, track progress, and manage donations
- **AI Chat Board:** Chat with an AI assistant for temple-related queries
- **Beautiful & Responsive UI:** Modern design with smooth animations using GSAP
- **Mock Mode:** Complete development environment without API keys

## 🛠 Tech Stack

- **Frontend:** React.js, Next.js, Tailwind CSS
- **Animations:** GSAP, Framer Motion
- **Payments:** Razorpay API
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git (for version control)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/temple-crowdfunding.git
cd temple-crowdfunding
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Mock Mode (No API keys required)**
```bash
# Windows
setup-mock-mode.bat

# Mac/Linux
npm run mock-setup
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🎯 Mock Mode Features

### Sample Data Included
- **5 Temple Campaigns** with realistic data
- **3 Sample Temples** with locations and deities
- **4 Sample Donations** with user history
- **2 Mock Users** for testing

### Test Credentials
- **Email:** `test@example.com`
- **Password:** `password`

### What Works in Mock Mode
- ✅ Browse all campaigns
- ✅ Create new campaigns
- ✅ Simulate donations (no real money)
- ✅ User dashboard with statistics
- ✅ AI chat assistant
- ✅ Authentication flow
- ✅ Responsive design
- ✅ Dark mode toggle

## 📱 Key Pages

- `/` - Homepage with featured campaigns
- `/campaigns` - Browse all campaigns
- `/campaigns/create` - Create new campaign
- `/campaigns/[id]` - Campaign details
- `/dashboard` - User dashboard
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Setup
npm run setup        # General setup
npm run mock-setup   # Mock mode setup
```

### Project Structure

```
temple-crowdfunding/
├── components/          # React components
│   ├── animations/      # GSAP animations
│   ├── layout/         # Header, Footer
│   ├── sections/       # Homepage sections
│   └── ui/             # UI components
├── pages/              # Next.js pages
│   ├── api/            # API endpoints
│   ├── auth/           # Authentication pages
│   ├── campaigns/      # Campaign pages
│   └── dashboard/      # User dashboard
├── lib/                # Utilities and mock data
├── styles/             # CSS styles
├── public/             # Static assets
└── scripts/            # Setup scripts
```

## 🔑 Production Setup

### Required API Keys

1. **MongoDB Database**
   - Local: `mongodb://localhost:27017/temple-crowdfunding`
   - Cloud: MongoDB Atlas (free tier)

2. **Razorpay Payment Gateway**
   - Sign up at [razorpay.com](https://razorpay.com)
   - Get API keys from Dashboard

3. **Google OAuth** (Optional)
   - Google Cloud Console
   - Create OAuth 2.0 credentials

4. **NextAuth Secret**
   - Generate random secret for authentication

### Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/temple-crowdfunding

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# Development
NODE_ENV=development
MOCK_MODE=true
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- Heroku
- Any Node.js hosting

## 📚 Documentation

- [Mock Mode Guide](README_MOCK_MODE.md) - Development without API keys
- [GitHub Setup](GITHUB_SETUP.md) - Push code to GitHub
- [Installation Guide](INSTALL_NODEJS.md) - Install Node.js
- [Quick Start](QUICK_START.md) - Get started quickly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for preserving our sacred heritage
- Inspired by the need to support temple communities
- Made possible by the open-source community

## 📞 Support

If you encounter any issues:
1. Check the documentation
2. Verify environment variables
3. Check browser console for errors
4. Open an issue on GitHub

---

**Made with ❤️ and 🙏 for preserving our divine heritage**