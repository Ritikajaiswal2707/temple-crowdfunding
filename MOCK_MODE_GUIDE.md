# 🏛️ Temple Crowdfunding Platform - Mock Mode Setup

## 🚀 Quick Start (Mock Mode - No API Keys Required)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Mock Environment
```bash
npm run mock-setup
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Your Browser
```
http://localhost:3000
```

---

## 🎯 What's Included in Mock Mode

### 📊 **Sample Data**
- **5 Temple Campaigns** with different categories
- **3 Sample Temples** with locations and deities
- **4 Sample Donations** with user history
- **2 Mock Users** for testing

### 🏛️ **Sample Campaigns**
1. **Renovate Ancient Shiva Temple** - ₹5,00,000 goal, 50% funded
2. **Temple Festival Celebration** - ₹2,00,000 goal, 75% funded
3. **Daily Operations Support** - ₹1,00,000 goal, 75% funded
4. **New Temple Construction** - ₹10,00,000 goal, 30% funded
5. **Temple Equipment Fund** - ₹1,50,000 goal, 60% funded

### 👤 **Test Credentials**
- **Email**: `test@example.com`
- **Password**: `password`

### 🎨 **Features Working**
- ✅ Browse all campaigns
- ✅ View campaign details
- ✅ Create new campaigns
- ✅ Simulate donations (no real money)
- ✅ User dashboard with statistics
- ✅ AI chat assistant
- ✅ Authentication flow
- ✅ Responsive design
- ✅ Dark mode toggle
- ✅ Animations and transitions

---

## 🔧 Mock Mode Features

### 💳 **Payment Simulation**
- No real money transactions
- Simulated payment flow
- Mock payment verification
- Donation tracking

### 🗄️ **Database Simulation**
- In-memory data storage
- No MongoDB required
- Persistent during session
- Realistic data relationships

### 🤖 **AI Chat**
- Predefined responses
- Temple-related queries
- Donation information
- Campaign guidance

### 🔐 **Authentication**
- Mock user system
- Session management
- Role-based access
- Secure password handling

---

## 📱 **How to Use Mock Mode**

### 1. **Browse Campaigns**
- Visit homepage to see featured campaigns
- Click "View All Campaigns" to see all
- Filter by category or status

### 2. **Create Campaign**
- Sign in with test credentials
- Click "Create Campaign" button
- Fill out the form with temple details
- Submit to see your campaign

### 3. **Make Donations**
- Click "Donate Now" on any campaign
- Fill out donation form
- Use any amount (no real payment)
- See donation confirmation

### 4. **User Dashboard**
- View your donation history
- See campaign statistics
- Manage your campaigns
- Track progress

### 5. **AI Chat**
- Click the chat icon (bottom right)
- Ask questions about temples
- Get helpful responses
- Learn about the platform

---

## 🎨 **Customization**

### **Add More Campaigns**
Edit `lib/mockData.js` to add more sample campaigns:

```javascript
export const mockCampaigns = [
  // Add your custom campaigns here
  {
    _id: 'mock-campaign-6',
    title: 'Your Custom Campaign',
    description: 'Your description here',
    // ... other fields
  }
];
```

### **Modify User Data**
Update user information in `lib/mockData.js`:

```javascript
export const mockUsers = [
  {
    _id: 'mock-user-3',
    name: 'Your Name',
    email: 'your@email.com',
    // ... other fields
  }
];
```

### **Customize AI Responses**
Edit chat responses in `lib/mockMode.js`:

```javascript
export const mockChatResponse = async (message) => {
  // Add your custom responses
  const responses = [
    "Your custom response here",
    // ... more responses
  ];
};
```

---

## 🚀 **Development Workflow**

### **1. Start Development**
```bash
npm run mock-setup  # Create environment
npm run dev         # Start server
```

### **2. Make Changes**
- Edit components in `components/`
- Modify pages in `pages/`
- Update styles in `styles/`
- Add new features

### **3. Test Features**
- Use test credentials to sign in
- Create campaigns and donations
- Test all user flows
- Check responsive design

### **4. Deploy to Production**
- Set `MOCK_MODE=false` in `.env.local`
- Add real API keys
- Deploy to Vercel/Netlify

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. Environment Not Created**
```bash
# Manually create .env.local
npm run mock-setup
```

#### **2. Server Won't Start**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### **3. Mock Data Not Loading**
- Check browser console for errors
- Verify `MOCK_MODE=true` in `.env.local`
- Restart development server

#### **4. Authentication Issues**
- Use test credentials: `test@example.com` / `password`
- Clear browser cache and cookies
- Check network tab for API errors

---

## 📊 **Mock Data Structure**

### **Campaign Fields**
- `title` - Campaign name
- `description` - Detailed description
- `goalAmount` - Fundraising target
- `raisedAmount` - Current funds raised
- `donorCount` - Number of donors
- `category` - Campaign type
- `status` - Active/Completed/Pending
- `featured` - Featured campaign flag
- `images` - Campaign images
- `deadline` - Campaign end date
- `updates` - Progress updates

### **User Fields**
- `name` - User's name
- `email` - User's email
- `role` - User role (donor/admin)
- `totalDonated` - Total donation amount
- `donationCount` - Number of donations
- `verified` - Account verification status

### **Temple Fields**
- `name` - Temple name
- `location` - Address and coordinates
- `deity` - Main deity
- `verified` - Temple verification status
- `images` - Temple photos

---

## 🎉 **You're Ready!**

Your temple crowdfunding platform is now running in mock mode with:
- ✅ Complete functionality
- ✅ Sample data
- ✅ No API keys required
- ✅ Full development environment
- ✅ Ready for customization

**Happy coding!** 🚀
