#!/bin/bash

# OHUI Solutions - Quick Deployment Script
# This script helps you deploy to GitHub Pages

echo "🚀 OHUI Solutions - Deployment Helper"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first:"
    echo "   Ubuntu/Debian: sudo apt install git"
    echo "   Mac: brew install git"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already a git repository
if [ -d .git ]; then
    echo "📁 Git repository already initialized"
else
    echo "📁 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
fi

echo ""
echo "📋 Next steps to deploy:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   → Go to: https://github.com/new"
echo "   → Repository name: ohui-solutions (or any name)"
echo "   → Make it Public"
echo "   → Don't initialize with README"
echo "   → Click 'Create repository'"
echo ""
echo "2. Copy your repository URL (it looks like):"
echo "   https://github.com/YOUR_USERNAME/ohui-solutions.git"
echo ""

read -p "3. Enter your GitHub repository URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "📦 Adding files to git..."
git add .

echo "💾 Creating commit..."
git commit -m "Initial commit - OHUI Solutions website"

echo "🔗 Adding remote repository..."
git remote remove origin 2>/dev/null  # Remove if exists
git remote add origin "$repo_url"

echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Final Step - Enable GitHub Pages:"
echo "   1. Go to: ${repo_url%.git}/settings/pages"
echo "   2. Under 'Source', select: main branch"
echo "   3. Click 'Save'"
echo "   4. Wait 2-3 minutes"
echo ""
echo "📍 Your website will be live at:"
echo "   https://YOUR_USERNAME.github.io/REPO_NAME/"
echo ""
echo "🔐 Admin panel will be at:"
echo "   https://YOUR_USERNAME.github.io/REPO_NAME/admin.html"
echo ""
echo "⚠️  IMPORTANT: Change the default admin password in admin.js!"
echo ""
