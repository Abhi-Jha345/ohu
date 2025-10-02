# OHU Security Solutions Website

A fully dynamic, admin-manageable website for OHU Security Solutions in Gwalior, Madhya Pradesh.

## Features

✅ **Fully Dynamic Content** - All sections editable through admin panel
✅ **No Backend Required** - Uses localStorage for data persistence
✅ **Real-Time Updates** - Changes sync automatically between tabs
✅ **Easy Review Import** - Import reviews from Google with simple copy-paste
✅ **WhatsApp Integration** - All inquiries go directly to WhatsApp
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Modern Design** - Beautiful gradients, animations, and UI

## File Structure

```
ohu/
├── index.html          # Main website
├── admin.html          # Admin panel
├── app.js             # Main website logic
├── admin.js           # Admin panel logic
├── styles.css         # All styling
├── ADMIN_GUIDE.md     # Admin panel user guide
└── README.md          # This file
```

## Quick Start

### For Users (Viewing Website)
1. Open `index.html` in any web browser
2. Browse products, services, and contact information
3. Click "Inquire on WhatsApp" to contact via WhatsApp

### For Admins (Managing Content)
1. Open `admin.html` in any web browser
2. Login with password: `admin123` (change this in admin.js)
3. Edit any section through the admin tabs
4. Changes automatically appear on main website
5. See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for detailed instructions

## Admin Panel Sections

- 🏢 **Business Info** - Company details, address, contact
- 🎯 **Hero Section** - Homepage banner and trust badges
- ✨ **Features** - Why Choose Us section
- 📦 **Products** - Product catalog with categories
- 🏷️ **Categories** - Product category management
- 🤝 **Partners** - Trusted partner logos
- 👥 **Clients** - Client types served
- 🔧 **Services** - Services offered
- ⭐ **Reviews** - Customer reviews with easy import
- 📄 **Legal Pages** - Privacy policy & terms
- ⚙️ **Settings** - Social media & about content

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks required
- **localStorage API** - Data persistence
- **WhatsApp API** - Direct messaging integration

## Data Management

### Storage
All data is stored in browser localStorage with these keys:
- `ohui_products` - Product catalog
- `ohui_categories` - Product categories
- `ohui_business` - Business information
- `ohui_hero` - Hero section content
- `ohui_features` - Features/benefits
- `ohui_partners` - Partner logos
- `ohui_clients` - Client categories
- `ohui_services` - Services offered
- `ohui_reviews` - Customer reviews
- `ohui_review_settings` - Review stats
- `ohui_about` - About section content
- `ohui_legal` - Legal pages content

### Backup & Restore
Use admin panel's "Export All Data" button to download backup as JSON.
Use "Import Data" to restore from backup file.

## Customization

### Changing Admin Password
Edit `admin.js` line ~15:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

### Changing Colors
Edit `styles.css` - main colors are defined in the root section:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* etc */
}
```

## WhatsApp Integration

All contact forms and product inquiries open WhatsApp with pre-filled messages containing:
- Customer name/details
- Product information (if applicable)
- Location reference (Gwalior Region)
- Professional message template

WhatsApp number is configurable in Business Info section.

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

⚠️ **Important:**
- Admin panel is client-side only
- No server-side authentication
- Change default password before deployment
- Don't expose admin.html publicly
- Consider hosting admin.html separately
- Regular backups recommended

## Review Import Format

When importing reviews, use this format (pipe-separated):
```
Customer Name | Rating | Review Text | Date | Source
```

Example:
```
John Doe | 5 | Excellent service! | 15th Jan, 2024 | Google
Jane Smith | 4 | Very professional team | 20th Jan, 2024 | JustDial
```

## Real-Time Sync

The website watches for localStorage changes:
1. Open admin panel in one tab
2. Open main website in another tab
3. Edit content in admin panel
4. See changes immediately on main website
5. Green notification appears on update

## Performance

- **Fast Loading** - No external dependencies
- **Lightweight** - ~50KB total (HTML + CSS + JS)
- **No API Calls** - Everything is client-side
- **Instant Updates** - No page refresh needed
- **Offline Ready** - Works without internet (after first load)

## How to Host

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages → Deploy from main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to netlify.com
2. Drag and drop the `ohu` folder
3. Your site will be live instantly

### Option 3: Any Web Server
Upload all files to your web hosting via FTP. The site will work immediately.

## Business Information

**Company:** OHU Security Solutions
**Location:** Achleshwar Complex, Naka Chandravadni, Lashkar, Gwalior - 474001
**Phone:** +91 700 065 1491
**Hours:** Mon - Sun: 10:00 AM - 7:00 PM
**Established:** 2009

**Services:**
- CCTV Installation & Surveillance Systems
- Computer Appliances
- Professional Installation Services
- After-sales Support

## Support & Documentation

- See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for detailed admin instructions
- Check browser console for error messages
- Test with sample data before adding real content
- Regular backups recommended

## License

Proprietary - © 2024 OHU Security Solutions. All rights reserved.

---

**Built for OHU Security Solutions, Gwalior**
