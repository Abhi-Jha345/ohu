# OHUI Solutions Website

A modular e-commerce website for selling CCTV cameras and computer appliances with WhatsApp integration.

## Features

- **Modular Design**: Add new products without changing code
- **Product Categories**: Filter by CCTV or Computer Appliances
- **WhatsApp Integration**: Direct inquiries via WhatsApp
- **Responsive Design**: Works on desktop and mobile devices
- **Easy to Host**: Simple HTML/CSS/JS - can be hosted anywhere

## File Structure

```
we_ohio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # JavaScript functionality
├── products.json       # Product data (modify this to add/edit products)
└── README.md           # This file
```

## How to Add/Edit Products

1. Open `products.json`
2. Edit the `whatsappNumber` field with your WhatsApp number (include country code, no + symbol)
3. Add products to the `products` array:

```json
{
  "id": 13,
  "name": "Product Name",
  "category": "cctv",  // or "computer"
  "description": "Product description here",
  "price": "Contact for Price",
  "image": "📹"  // Use any emoji as placeholder
}
```

## How to Host

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages → Deploy from main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to netlify.com
2. Drag and drop the `we_ohio` folder
3. Your site will be live instantly

### Option 3: Any Web Server
Upload all files to your web hosting via FTP. The site will work immediately.

## Customization

- **Colors**: Edit `styles.css` - main colors are `#667eea` and `#764ba2`
- **Company Name**: Edit in `index.html` (search for "OHUI Solutions")
- **Products**: Edit `products.json`
- **WhatsApp Number**: Edit in `products.json`

## Requirements

- Modern web browser
- No server-side dependencies
- No build process needed

## Testing Locally

Simply open `index.html` in your web browser. Note: WhatsApp links work best on mobile devices or with WhatsApp Web installed.
