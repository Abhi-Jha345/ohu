# OHU Security Solutions - Admin Panel Guide

## Overview
The admin panel allows you to manage all content on the OHU Security Solutions website through an easy-to-use interface. All changes are saved to your browser's localStorage and automatically sync to the main website.

## Accessing the Admin Panel
1. Open `admin.html` in your web browser
2. Default password: `admin123`
3. Click "Login" to access the admin dashboard

## Admin Panel Sections

### 🏢 Business Info
Edit your company's core information:
- Company Name
- Tagline
- WhatsApp Number
- Email Address
- Physical Address
- Business Hours
- Google Maps URL
- Year Established

**Click "Save Business Info" to apply changes**

### 🎯 Hero Section
Customize the main hero banner on your homepage:
- Main Heading
- Subheading
- 4 Trust Badges (each with number and text)
  - Example: "15+ Years Experience"

**Click "Save Hero Section" to apply changes**

### ✨ Features
Manage the "Why Choose Us" features:
- Add/Edit/Delete features
- Each feature has:
  - Icon (emoji)
  - Title
  - Description

**Click "Add Feature" to create new features**

### 📦 Products
Manage your product catalog:
- Add/Edit/Delete products
- Each product has:
  - Name
  - Category
  - Description
  - Price
  - Image (emoji)

**Products integrate with WhatsApp for inquiries**

### 🏷️ Categories
Manage product categories:
- Add/Edit/Delete categories
- Used to filter products on the main website

### 🤝 Partners
Manage trusted partner logos:
- Add/Edit/Delete partners
- Each partner has:
  - Logo (emoji or text)
  - Partner Name

**Displayed in the "Trusted Partners" section**

### 👥 Clients
Manage client types you serve:
- Add/Edit/Delete client categories
- Each client has:
  - Icon (emoji)
  - Client Type Name
  - Example: "🏢 Corporate Offices"

### 🔧 Services
Manage the services you offer:
- Add/Edit/Delete services
- Each service has:
  - Icon (emoji)
  - Title
  - Description

### ⭐ Reviews
Manage customer reviews with two methods:

#### Method 1: Add Review Manually
1. Click "Add Review"
2. Fill in:
   - Customer Name
   - Rating (1-5 stars)
   - Review Text
   - Date
   - Source (Google/JustDial)

#### Method 2: Easy Import from Google
1. Click "📥 Easy Import Reviews"
2. Follow the instructions in the modal
3. Paste reviews in this format:
   ```
   John Doe | 5 | Great service! | 18th May, 2021 | Google
   Jane Smith | 4 | Very professional | 20th June, 2021 | Google
   ```
4. Click "Parse & Import Reviews"
5. Select which reviews to import
6. Click "✓ Import Selected Reviews"

**Review Settings:**
- Overall Rating (e.g., 4.5)
- Total Review Count (e.g., 120)
- Google Business Link
- JustDial Link

**Only reviews marked as visible will show on the website**

### 📄 Legal Pages
Manage Privacy Policy and Terms & Conditions:
- Toggle each page on/off
- Edit content directly in the admin panel
- Simple enable/disable switches

**Click "Save Legal Pages" to apply changes**

### ⚙️ Settings
Additional website settings:
- WhatsApp Number
- Company Name
- Social Media Links
- About Section Content

## How the System Works

### Data Storage
- All data is stored in your browser's localStorage
- No database or server required
- Data persists between sessions
- Changes are immediate

### Real-Time Updates
- Open the admin panel in one tab
- Open the main website (index.html) in another tab
- Changes made in the admin panel automatically appear on the main website
- A green notification appears when content updates

### Data Export/Import
- Use "Export All Data" to download a backup (JSON file)
- Use "Import Data" to restore from a backup
- Use "Reset to Default" to restore original sample data

## Tips for Best Results

### Images & Icons
- Use emojis for icons (😊 🎯 🔧 etc.)
- Or use text-based logos ("HP", "Dell", "Lenovo")
- Keep icons consistent in size

### Content Writing
- **Features**: Focus on benefits and unique selling points
- **Services**: Be specific about what you offer
- **Products**: Include key specifications and benefits
- **Reviews**: Keep them authentic and specific

### Review Management
- Import real reviews from Google Business
- Only display your best reviews (toggle visibility)
- Update review count regularly
- Keep rating accurate

### WhatsApp Integration
- Make sure your WhatsApp number is correct (with country code)
- Format: +917000651491
- All inquiries will open WhatsApp with pre-filled messages

## Common Tasks

### Adding a New Product
1. Go to "📦 Products" tab
2. Click "Add Product"
3. Fill in all fields
4. Choose correct category
5. Click "Save Product"

### Importing Reviews
1. Visit your Google Business page
2. Copy reviews manually
3. Go to "⭐ Reviews" tab
4. Click "📥 Easy Import Reviews"
5. Paste in format: Name | Rating | Text | Date | Source
6. Parse and select reviews to import

### Updating Company Info
1. Go to "🏢 Business Info" tab
2. Update any fields
3. Click "Save Business Info"
4. Changes appear immediately on main website

### Changing Homepage Hero
1. Go to "🎯 Hero Section" tab
2. Update heading and subheading
3. Update trust badge numbers and text
4. Click "Save Hero Section"

## Troubleshooting

### Changes Not Appearing?
- Make sure you clicked the "Save" button
- Refresh the main website page
- Check browser console for errors

### Lost Your Data?
- Check if you have an export backup
- Use "Import Data" to restore
- Otherwise use "Reset to Default" to start fresh

### Review Import Not Working?
- Make sure you're using the correct format
- Each review must be on a separate line
- Use the pipe symbol (|) to separate fields
- Minimum required: Name | Rating | Text | Date

## Security Notes

- Change the default admin password in admin.js
- Don't share admin.html with unauthorized users
- Regularly export backups of your data
- The admin panel is client-side only (no server access)

## Support

For issues or questions:
1. Check this guide first
2. Verify the format of your data
3. Look for error messages in browser console
4. Test with sample data to isolate issues

---

**Made with ❤️ for OHU Security Solutions**
