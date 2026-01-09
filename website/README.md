# IML Industries Website

A professional multi-product website for IML Industries, showcasing silicon products, fresh eggs, and Sante juices.

## Website Structure

```
website/
├── index.html                  # Main homepage
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet with brand colors
│   ├── images/
│   │   ├── logo/              # Logo files
│   │   └── products/          # Product images
│   └── videos/                # Product videos
└── pages/
    ├── silicon-products.html  # Silicon & sealant products
    ├── eggs.html              # Fresh eggs products
    └── sante-juices.html      # Sante juice products
```

## Features

### Brand Identity
- Orange (#FF6B1A) and Black (#000000) color scheme
- IML logo representing silicon-filled gaps forming "IML"
- Professional, modern design

### Navigation
- Sticky header with navigation menu
- Easy access to all product categories
- Responsive design for mobile and desktop

### Product Categories
1. **Silicon & Sealants**: Acrylic Flexcaulk Pro, Weather Shield Pro
2. **Fresh Eggs**: Large, Extra Large, and Free Range options
3. **Sante Juices**: Orange, Apple, Mixed Fruit, Grape, Pineapple, Mango

### Key Sections
- Hero section with call-to-action
- Product category cards with images
- Video showcase section
- About section with brand story
- Contact information
- Footer with business details

## How to Use

### Opening the Website
1. Navigate to the `website` folder
2. Open `index.html` in any web browser
3. Use the navigation menu to explore different product pages

### Viewing on a Local Server (Recommended)
For best results, run a local web server:

```bash
# Using Python 3
cd website
python -m http.server 8000

# Then open: http://localhost:8000
```

### Customization

#### Updating Contact Information
Edit the contact details in the footer of each HTML file:
- Phone: +27 79 947 4636
- Email: contact@imlindustries.com
- Address: 24 Gabriel Crescent, Ext 3/KZN

#### Adding Product Images
1. Place images in `assets/images/products/`
2. Update the image paths in the HTML files
3. For Eggs and Sante Juices, replace placeholder icons with actual product photos

#### Updating Brand Colors
Edit the CSS variables in `assets/css/style.css`:
```css
:root {
    --primary-orange: #FF6B1A;
    --dark-navy: #000000;
    --light-gray: #C4C4C4;
    --white: #FFFFFF;
}
```

## Browser Compatibility
- Chrome (Recommended)
- Firefox
- Safari
- Edge
- All modern browsers

## Responsive Design
The website is fully responsive and adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Contact & Support
For website updates or technical support, refer to the IML Industries contact information above.

## Copyright
© 2026 IML Industries. All rights reserved.
