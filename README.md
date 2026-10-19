# Flipkart E-Commerce Web Application (Pixel-Faithful Clone)

A comprehensive, pixel-faithful desktop, tablet, and mobile clone of [Flipkart](https://flipkart.com), built for learning and portfolio purposes using **React 18**, **Vite**, **React Router v6**, and **Tailwind CSS**.

---

## 🚀 Features & Highlights

### 1. 🎨 Authentic Design System
- **Flipkart Color Palette**:
  - Primary Blue: `#2874f0`
  - Action / Place Order CTA: `#fb641b`
  - Add to Cart CTA: `#ff9f00`
  - Background: `#f1f3f6`
  - Green rating & discount highlights: `#388e3c`
  - Plus member gold accents: `#ffe500`
- **Typography**: Google Fonts **Roboto** (weights 300, 400, 500, 700) with standard fallback.
- **Flipkart Assured Badge**: Custom styled *f-Assured* badge.
- **Card Styling**: Elevation shadows `(0 1px 2px rgba(0,0,0,.2))`, micro-animations, and tight retail layout spacing.

### 2. 🔍 Sticky Blue Header & Mega Navigation
- **Flipkart Text Logo**: "Flipkart *Explore Plus*" branding with star badge.
- **Live Search & Autocomplete**: Debounced, instant query matching across products, brands, and categories with click navigation.
- **Pincode / Location Selector**: Displays "Deliver to: 560001", opens interactive modal with 6-digit validation, geolocation API lookup, and persistence to `localStorage`.
- **User Profile Menu**: Dynamic dropdown with links to Profile, Orders, Wishlist, and SuperCoins balance.
- **Responsive Navigation**: Slide-in mobile navigation drawer and fixed mobile bottom tab bar (Home, Categories, Account, Cart).
- **Category Strip**: Horizontal strip with 9 main categories (Top Offers, Mobiles, Electronics, Fashion, Home, Appliances, Beauty, Toys, Grocery, Travel) with hover mega-dropdowns on desktop and touch-friendly scroll on mobile.

### 3. 🛍️ Home Page
- **Hero Carousel**: Auto-rotating promotional banner slider with touch swipe gesture support, indicators, and pause on hover.
- **Deal Sliders**: "Deals of the Day" with dynamic countdown timer, "Best of Electronics", "Trending Fashion", "Home Essentials", "Beauty Picks".
- **Promotional Banners**: Grid of Flipkart Plus, Travel, and SuperCoin cards.
- **Suggested Products**: Responsive product recommendations grid.
- **Flipkart Footer**: Full multi-column policy, help, registered office address, social links, and payment options strip.

### 4. 🛒 Product Search & Listing Page
- **Collapsible Filter Sidebar**:
  - Price range slider up to ₹1,50,000
  - Brand checkboxes (Apple, Samsung, Nike, ASUS, Sony, LG, etc.)
  - Customer ratings filter (4★ & above, 3★ & above)
  - Discount filter (10%, 20%, 30%, 40%, 50%+ off)
  - "Exclude Out of Stock" toggle
  - "Flipkart Assured" items filter
- **Sorting Modes**: Relevance, Popularity, Price Low to High, Price High to Low, Customer Rating.
- **Layout Switcher**: Toggle between Grid and List views.
- **Pagination & Breadcrumbs**: Fully navigable with empty state handling.

### 5. 📱 Product Detail Page
- **Interactive Gallery**: Thumbnail selector, high-res preview, and desktop hover-zoom lens.
- **Sticky Flipkart Action Bar**: "Add to Cart" (#ff9f00) and "Buy Now" (#fb641b).
- **Variant Selectors**: Colors, Storage capacities, and Sizes.
- **Live Delivery Checker**: Auto-filled from user pincode with estimated delivery date calculations.
- **Bank Offers & Highlights**: Expandable offers list and full technical specifications table.
- **Ratings & Reviews**: Rating badge, 5-star distribution breakdown bar charts, and verified customer testimonials.
- **Similar Products Slider**: Cross-category recommendation carousel.

### 6. 🛒 Cart & Save For Later
- **Shopping Cart Management**: Add, increment/decrement quantity, and remove items.
- **Save For Later**: Move items between active cart and saved list.
- **Promo Code Engine**: Test with `FLIPKART10` (10% extra off) or `FLIPKART500` (flat ₹500 off).
- **Price Details Breakdown**: Selling price, MRP discount, delivery charges calculation, and total savings banner.

### 7. 💳 Multi-Step Accordion Checkout
1. **Login Verification**: Verified badge or quick sign-in.
2. **Delivery Address**: Add, edit, select addresses (Home / Work) with automatic city/state lookup from pincode.
3. **Order Summary**: Line-item review with delivery schedule.
4. **Payment Gateways**: Simulated UPI (Google Pay, PhonePe), Credit/Debit Card, Net Banking, and Cash on Delivery (COD).
5. **Confirmation & Confetti**: Animated success badge, generated Order ID (e.g., `#OD...`), and links to track order.

### 8. 👤 Orders, Wishlist & Profile
- **My Orders**: Complete order timeline tracker (`Order Placed` -> `Packed` -> `Shipped` -> `Delivered`), order search, and order cancellation.
- **Wishlist**: Real-time heart toggles across all cards, item removal, and one-click "Move to Cart".
- **My Profile & Address Book**: View profile information, SuperCoin rewards, and manage saved shipping addresses.

---

## 📦 Project Structure

```text
Flipkart_Clone/
├── public/
│   └── favicon.svg              # Custom Flipkart SVG favicon
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── AuthModal.jsx    # Split-panel login/signup modal with OTP flow
│   │   ├── CategoryStrip/
│   │   │   └── CategoryStrip.jsx # Subcategory mega-dropdown & mobile scroll
│   │   ├── Common/
│   │   │   ├── AssuredBadge.jsx # Flipkart Assured badge
│   │   │   ├── DealSlider.jsx   # Horizontal product slider with timer
│   │   │   ├── Footer.jsx       # Complete Flipkart footer
│   │   │   ├── ProductCard.jsx  # Grid/List product card with wishlist
│   │   │   └── RatingBadge.jsx  # Green star rating badge
│   │   ├── Header/
│   │   │   ├── BottomNav.jsx    # Mobile bottom navigation bar
│   │   │   ├── Header.jsx       # Sticky blue header with auto-suggest
│   │   │   ├── MobileDrawer.jsx # Slide-out drawer menu for mobile
│   │   │   └── PincodeModal.jsx # Location selector & geolocation modal
│   │   ├── Home/
│   │   │   ├── HeroCarousel.jsx # Auto-playing banner carousel with swipe
│   │   │   └── PromoGrid.jsx    # 3-column promotional strip
│   │   └── Listing/
│   │       └── FilterSidebar.jsx # Sidebar filters (price, brand, rating)
│   ├── context/
│   │   ├── AuthContext.jsx      # Login, signup, OTP (123456), addresses, orders
│   │   ├── CartContext.jsx      # Cart items, qty, save for later, coupons
│   │   ├── LocationContext.jsx  # Pincode state, geolocation, delivery lookup
│   │   ├── ToastContext.jsx     # Floating action feedback toasts
│   │   └── WishlistContext.jsx  # Wishlist state & toggle handlers
│   ├── data/
│   │   ├── banners.js           # Hero banners & promotional graphics
│   │   ├── categories.js        # 9 Categories with mega-dropdown links
│   │   └── products.js          # 70+ detailed products across all categories
│   ├── pages/
│   │   ├── CartPage.jsx         # Cart items & price calculation
│   │   ├── CheckoutPage.jsx     # 4-Step checkout & confirmation
│   │   ├── HomePage.jsx         # Homepage with deal sliders
│   │   ├── NotFoundPage.jsx     # 404 handler
│   │   ├── OrdersPage.jsx       # Order history & status tracker
│   │   ├── ProductDetailPage.jsx# Product specs, gallery & delivery check
│   │   ├── ProductListPage.jsx  # Search results & category listing
│   │   ├── ProfilePage.jsx      # Profile details & address management
│   │   └── WishlistPage.jsx     # Saved favorites
│   ├── utils/
│   │   └── formatters.js        # Indian currency (₹), pincode database, dates
│   ├── App.jsx                  # Main router and global providers
│   ├── index.css                # Tailwind directives & Flipkart styling
│   └── main.jsx                 # React root mounting
├── index.html                   # HTML template with Google Fonts (Roboto)
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom theme colors, shadows & fonts
└── vite.config.js               # Vite config
```

---

## 🛠️ Setup & Running Instructions

### Prerequisites
- **Node.js**: v18.0 or newer
- **npm**: v9.0 or newer

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
This generates an optimized static build in the `/dist` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Demo Credentials & Test Data

- **OTP Verification Flow**: When using "Request OTP", enter mock code **`123456`**.
- **Discount Coupons**:
  - `FLIPKART10` : 10% instant discount
  - `FLIPKART500`: Flat ₹500 discount
- **Test Pincodes**:
  - `560001` : Bengaluru, Karnataka
  - `110001` : New Delhi, Delhi
  - `400001` : Mumbai, Maharashtra
  - Or any valid 6-digit Indian pincode.
