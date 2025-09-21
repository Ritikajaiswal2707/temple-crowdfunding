# 🏛️ Temple Crowdfunding Platform - Mock Mode

## 🚀 **Quick Start (No API Keys Required)**

### **Windows Users:**
1. **Double-click** `setup-mock-mode.bat` to create environment file
2. **Run** `npm install` (if not already done)
3. **Run** `npm run dev`
4. **Open** `http://localhost:3000`

### **Mac/Linux Users:**
1. **Run** `npm run mock-setup`
2. **Run** `npm install` (if not already done)
3. **Run** `npm run dev`
4. **Open** `http://localhost:3000`

---

## 🎯 **What You Get in Mock Mode**

### **📊 Sample Data**
- **5 Temple Campaigns** with realistic data
- **3 Sample Temples** with locations and deities
- **4 Sample Donations** with user history
- **2 Mock Users** for testing

### **🏛️ Sample Campaigns**
1. **Renovate Ancient Shiva Temple** - ₹5,00,000 goal, 50% funded
2. **Temple Festival Celebration** - ₹2,00,000 goal, 75% funded
3. **Daily Operations Support** - ₹1,00,000 goal, 75% funded
4. **New Temple Construction** - ₹10,00,000 goal, 30% funded
5. **Temple Equipment Fund** - ₹1,50,000 goal, 60% funded

### **👤 Test Credentials**
- **Email**: `test@example.com`
- **Password**: `password`

---

## 🎨 **Features Working in Mock Mode**

### **✅ Core Features**
- Browse all campaigns
- View campaign details with progress
- Create new campaigns
- Simulate donations (no real money)
- User dashboard with statistics
- AI chat assistant
- Authentication flow
- Responsive design
- Dark mode toggle
- Animations and transitions

### **💳 Payment Simulation**
- No real money transactions
- Simulated payment flow
- Mock payment verification
- Donation tracking and history

### **🗄️ Database Simulation**
- In-memory data storage
- No MongoDB required
- Persistent during session
- Realistic data relationships

### **🤖 AI Chat**
- Predefined responses
- Temple-related queries
- Donation information
- Campaign guidance

---

## 📱 **How to Use**

### **1. Browse Campaigns**
- Visit homepage to see featured campaigns
- Click "View All Campaigns" to see all
- Filter by category or status

### **2. Create Campaign**
- Sign in with test credentials
- Click "Create Campaign" button
- Fill out the form with temple details
- Submit to see your campaign

### **3. Make Donations**
- Click "Donate Now" on any campaign
- Fill out donation form
- Use any amount (no real payment)
- See donation confirmation

### **4. User Dashboard**
- View your donation history
- See campaign statistics
- Manage your campaigns
- Track progress

### **5. AI Chat**
- Click the chat icon (bottom right)
- Ask questions about temples
- Get helpful responses
- Learn about the platform

---

## 🔧 **Customization**

### **Add More Campaigns**
Edit `lib/mockData.js` to add more sample campaigns:

```javascript
export const mockCampaigns = [
  // Add your custom campaigns here
  {
    _id: 'mock-campaign-6',
    title: 'Your Custom Campaign',
    description: 'Your description here',
    goalAmount: 100000,
    raisedAmount: 0,
    donorCount: 0,
    category: 'renovation',
    status: 'active',
    featured: false,
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
    role: 'donor',
    totalDonated: 0,
    donationCount: 0,
    verified: true
  }
];
```

---

## 🚀 **Development Workflow**

### **1. Start Development**
```bash
# Windows
setup-mock-mode.bat

# Mac/Linux
npm run mock-setup

# Then
npm install
npm run dev
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
- **Windows**: Double-click `setup-mock-mode.bat`
- **Mac/Linux**: Run `npm run mock-setup`

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
- `category` - Campaign type (renovation, festival, etc.)
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

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all files are created correctly
3. Check browser console for errors
4. Restart the development server

**Mock Mode is perfect for:**
- Development and testing
- Demonstrations
- Learning the platform
- Customization before production
