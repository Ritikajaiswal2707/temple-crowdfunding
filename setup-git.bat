@echo off
echo 🚀 Git Installation Helper for Windows
echo.
echo This script will help you install Git and push to GitHub
echo.
echo 📋 Steps to install Git:
echo.
echo 1. Go to: https://git-scm.com/download/win
echo 2. Download the latest version for Windows
echo 3. Run the downloaded .exe file
echo 4. IMPORTANT: Select "Git from the command line and also from 3rd-party software"
echo 5. Follow the installation wizard
echo 6. Restart your terminal after installation
echo.
echo 🔍 After installation, verify with:
echo    git --version
echo.
echo 🚀 Then you can run:
echo    git init
echo    git add .
echo    git commit -m "Initial commit"
echo    git remote add origin https://github.com/YOUR_USERNAME/temple-crowdfunding.git
echo    git push -u origin main
echo.
echo 📖 For detailed instructions, see: GITHUB_SETUP.md
echo.
pause
