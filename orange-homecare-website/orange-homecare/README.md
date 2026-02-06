# 🍊 Orange Homecare - Gleam Dish Wash Website

A professional, responsive multi-page landing website for Orange Homecare's Gleam Dish Wash product. Built with HTML, CSS, and JavaScript - ready for deployment on GitHub Pages.

![NAFDAC Certified](https://img.shields.io/badge/NAFDAC-Certified-green)
![Made in Nigeria](https://img.shields.io/badge/Made%20in-Nigeria-green)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue)

## 🌟 Features

### Complete Website Structure
- **Home Page (index.html)** - Landing page with hero, features, about, pricing, testimonials
- **About Page (about.html)** - Detailed company story, values, and certifications
- **Products Page (product.html)** - Product details, how-it-works, benefits, pricing
- **Contact Page (contact.html)** - Contact info, order form, contact form, FAQ

### Key Features
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Mobile Hamburger Menu** - 3-bar menu with About, Products, Contact options
- ✅ **Smooth Scrolling** - Seamless navigation between sections
- ✅ **WhatsApp Integration** - Floating button + form submissions via WhatsApp
- ✅ **Order Form** - Complete order submission with plan selection
- ✅ **Contact Form** - Easy inquiry submission
- ✅ **Orange Homecare Branding** - Consistent logo and color scheme
- ✅ **NAFDAC Certification Badges**
- ✅ **Scroll Animations** - Fade-in effects on elements
- ✅ **SEO Optimized** - Meta descriptions and semantic HTML

## 📁 File Structure

```
orange-homecare/
├── index.html              # Home/Landing page
├── about.html              # About Us page
├── product.html            # Products page
├── contact.html            # Contact & Order page
├── styles.css              # Complete stylesheet
├── script.js               # JavaScript functionality
├── logo.png                # Orange Homecare logo (ADD YOUR OWN)
├── dishwashing-image.png   # Product image (ADD YOUR OWN)
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create a new repository on GitHub**
   - Go to https://github.com
   - Click "New repository"
   - Name it (e.g., `orange-homecare`)
   - Choose "Public"
   - Don't initialize with README

2. **Upload all files**
   - Click "uploading an existing file"
   - Drag and drop ALL files (including your logo and images)
   - Commit changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Source: Deploy from "main" branch
   - Click "Save"
   - Your site will be live at: `https://YOUR-USERNAME.github.io/orange-homecare/`

### Option 2: Local Testing

1. Download all files to one folder
2. Add your `logo.png` and `dishwashing-image.png` to the folder
3. Open `index.html` in your browser
4. Test all pages and forms

## 🖼️ Adding Your Images

**IMPORTANT:** You need to add two image files:

1. **logo.png** - Your Orange Homecare logo
   - Recommended size: 200x50px (or similar aspect ratio)
   - Format: PNG with transparent background

2. **dishwashing-image.png** - Your product/action image
   - Recommended size: 600x400px minimum
   - Format: PNG or JPG

Place both files in the same folder as your HTML files.

## 📄 Pages Overview

### 1. Home Page (index.html)
- Hero section with main value proposition
- Problem statement with product image
- 3 feature cards (grease removal, safety, refills)
- **Complete About section** with:
  - WHY We Exist
  - HOW We Do It
  - WHAT We Make
  - Our Founder
  - Our Promise
- Customer testimonials
- Call-to-action
- WhatsApp button

### 2. About Page (about.html)
- Full company story and mission
- Core values (4 cards)
- Founder section
- NAFDAC certification information
- Promise section

### 3. Products Page (product.html)
- Product hero with features list
- How the refill system works (4 steps)
- Detailed product features
- Benefits grid

### 4. Contact Page (contact.html)
- Contact information cards (Email, Phone, WhatsApp, Location)
- **Order Form** with:
  - Full name, phone, email
  - Product selection
  - City, quantity, delivery address
  - Additional notes
- **Contact Form** with:
  - Name, email, phone
  - Subject selection
  - Message
- FAQ section

## 💬 WhatsApp Integration

The website features comprehensive WhatsApp integration:

1. **Floating Button** - Always visible in bottom right corner
   - Direct link to +234 813 456 6721
   - Pre-filled contextual messages

2. **Order Form** - Submits order details via WhatsApp
   - Formatted message with all order information
   - Opens WhatsApp in new tab

3. **Contact Form** - Submits inquiries via WhatsApp
   - Formatted message with contact details
   - Opens WhatsApp in new tab

## 📱 Mobile Menu

On mobile devices (screen width < 768px):
- Navigation collapses to hamburger menu (☰)
- Clicking the 3 bars opens dropdown with:
  - About (scrolls to About section on landing page)
  - Products (goes to Products page)
  - Contact (goes to Contact page)
  - Order Now (goes to Order form)

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-orange: #FF5722;    /* Main brand color */
    --dark-orange: #E64A19;       /* Hover states */
    --green: #4CAF50;             /* Success/checkmarks */
    --blue: #2196F3;              /* Feature accents */
    /* ... more colors */
}
```

### Updating Contact Info
Search and replace in all HTML files:
- Email: `orangehomecareltd@gmail.com`
- Phone: `+234 813 456 6721`
- WhatsApp: `2348134566721`

### Changing Product Options
Edit the plan options in `contact.html` to update product offerings.

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Variables, Animations
- **JavaScript (ES6+)** - DOM manipulation, Form handling
- **Google Fonts** - Poppins font family

### Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🐛 Troubleshooting

### Images not showing?
- Ensure `logo.png` and `dishwashing-image.png` are in the root folder
- Check file names match exactly (case-sensitive)

### Navigation links not working?
- Verify all HTML files are in the same folder
- Check filename spelling

### Forms not submitting?
- Verify WhatsApp number is correct in script.js
- Check JavaScript console for errors
- Ensure JavaScript is enabled

### Mobile menu not working?
- Clear browser cache
- Check that script.js is loaded properly
- Verify no JavaScript errors in console

## ✅ Testing Checklist

Before going live, test:
- [ ] All 4 pages load correctly
- [ ] Logo appears on all pages
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] WhatsApp button works
- [ ] Order form submits to WhatsApp
- [ ] Contact form submits to WhatsApp
- [ ] Images load correctly
- [ ] Responsive on mobile devices
- [ ] Smooth scrolling works
- [ ] About section displays correctly

## 📞 Contact Information

**Orange Homecare**
- 📧 Email: orangehomecareltd@gmail.com
- 📞 Phone: +234 813 456 6721
- 💬 WhatsApp: +234 813 456 6721
- 📍 Location: Lagos, Nigeria

## 📄 License

© 2025 Orange Homecare. All rights reserved.

**NAFDAC Certified | Proudly Made in Nigeria**

---

**Orange Homecare** — *Improving lives, one home at a time.*

*Gleam Dish Wash - Cuts Grease in Seconds. Gentle on Hands. Easy on Your Pocket.*
