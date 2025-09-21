# 🚀 Install Node.js and npm on Windows

## **Problem:** 
`node` and `npm` commands are not recognized in your terminal.

## **Solution:** Install Node.js (which includes npm)

### **Method 1: Download from Official Website (Recommended)**

1. **Go to Node.js website:**
   - Visit: https://nodejs.org/
   - Click the **"Download Node.js (LTS)"** button
   - This will download the Windows installer

2. **Run the installer:**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - **Important:** Check "Add to PATH" during installation
   - Click "Next" through all steps
   - Click "Install" to complete

3. **Verify installation:**
   - Close and reopen your terminal/PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - You should see version numbers

### **Method 2: Using Chocolatey (If you have it)**

```powershell
choco install nodejs
```

### **Method 3: Using Winget (Windows Package Manager)**

```powershell
winget install OpenJS.NodeJS
```

---

## **After Installation:**

### **1. Restart your terminal**
- Close PowerShell/Command Prompt
- Open a new terminal window

### **2. Verify installation**
```bash
node --version
npm --version
```

### **3. Navigate to your project**
```bash
cd "C:\Users\HP\OneDrive\Desktop\ritika temple crowdfunding\temple-crowdfunding"
```

### **4. Install project dependencies**
```bash
npm install
```

### **5. Create mock environment**
```bash
# Windows
setup-mock-mode.bat

# Or manually create .env.local with MOCK_MODE=true
```

### **6. Start development server**
```bash
npm run dev
```

### **7. Open browser**
```
http://localhost:3000
```

---

## **Troubleshooting:**

### **If commands still not recognized:**

1. **Check PATH environment variable:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Click "Environment Variables"
   - Under "System Variables", find "Path"
   - Click "Edit" and add: `C:\Program Files\nodejs\`
   - Click "OK" on all dialogs
   - Restart terminal

2. **Manual PATH addition:**
   - Open PowerShell as Administrator
   - Run: `$env:PATH += ";C:\Program Files\nodejs"`
   - Test: `node --version`

3. **Reinstall Node.js:**
   - Uninstall from Control Panel
   - Download fresh installer from nodejs.org
   - Install again with "Add to PATH" checked

---

## **Quick Commands After Installation:**

```bash
# Check versions
node --version
npm --version

# Install dependencies
npm install

# Start development
npm run dev

# Open browser to http://localhost:3000
```

---

## **What You'll Get:**

- ✅ **Node.js** - JavaScript runtime
- ✅ **npm** - Package manager
- ✅ **npx** - Package runner
- ✅ **All npm scripts** working
- ✅ **Development server** running
- ✅ **Mock mode** ready to use

---

## **Need Help?**

If you're still having issues:
1. Make sure you downloaded from the official Node.js website
2. Check that "Add to PATH" was selected during installation
3. Restart your computer after installation
4. Try running PowerShell as Administrator

**Once Node.js is installed, you'll be able to run the temple crowdfunding platform!** 🏛️
