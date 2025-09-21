# 🚀 Quick Start Guide - Temple Crowdfunding Platform

## **Current Issue:** Node.js and npm not installed

### **Step 1: Install Node.js**
1. **Double-click** `install-nodejs.bat` for installation guide
2. **Or** go to https://nodejs.org/ and download LTS version
3. **Install** with "Add to PATH" checked
4. **Restart** your terminal

### **Step 2: Verify Installation**
```bash
node --version
npm --version
```

### **Step 3: Setup Project**
```bash
# Install dependencies
npm install

# Create mock environment
setup-mock-mode.bat

# Start development server
npm run dev
```

### **Step 4: Open Browser**
```
http://localhost:3000
```

---

## **What You'll Get:**

### **🏛️ Temple Crowdfunding Platform**
- **5 Sample Campaigns** with realistic data
- **Mock Payment System** (no real money)
- **User Dashboard** with statistics
- **AI Chat Assistant** for help
- **Responsive Design** for all devices
- **Dark Mode** toggle
- **Animations** and smooth transitions

### **👤 Test Credentials**
- **Email:** `test@example.com`
- **Password:** `password`

### **🎯 Features Working**
- ✅ Browse campaigns
- ✅ Create campaigns
- ✅ Simulate donations
- ✅ User authentication
- ✅ Dashboard with stats
- ✅ AI chat
- ✅ Responsive design
- ✅ Dark mode

---

## **Troubleshooting:**

### **If Node.js commands not recognized:**
1. **Restart terminal** after installation
2. **Check PATH** environment variable
3. **Reinstall Node.js** with "Add to PATH" checked
4. **Run PowerShell as Administrator**

### **If npm install fails:**
1. **Clear cache:** `npm cache clean --force`
2. **Delete node_modules:** `rmdir /s node_modules`
3. **Reinstall:** `npm install`

### **If server won't start:**
1. **Check port 3000** is not in use
2. **Try different port:** `npm run dev -- -p 3001`
3. **Check .env.local** file exists

---

## **Development Commands:**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Setup mock environment
npm run mock-setup
```

---

## **File Structure:**

```
temple-crowdfunding/
├── components/          # React components
├── pages/              # Next.js pages
├── lib/                # Utilities and mock data
├── styles/             # CSS styles
├── public/             # Static assets
├── .env.local          # Environment variables
├── package.json        # Dependencies
└── README_MOCK_MODE.md # Mock mode guide
```

---

## **Next Steps After Installation:**

1. **Install Node.js** (if not done)
2. **Run setup commands** above
3. **Start development** with `npm run dev`
4. **Customize** the platform as needed
5. **Deploy** to production when ready

---

## **Need Help?**

- **Installation issues:** See `INSTALL_NODEJS.md`
- **Mock mode setup:** See `README_MOCK_MODE.md`
- **Development guide:** See `MOCK_MODE_GUIDE.md`

**Once Node.js is installed, you'll have a fully functional temple crowdfunding platform!** 🏛️✨
