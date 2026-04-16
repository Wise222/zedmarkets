# ZEDMARKETS - PROJECT CONTEXT
Last updated: April 2026
Project path: D:\Projects\zedmarkets
Stack: React 18 + Vite + React Router v6 + inline styles (no CSS framework)
Status: Frontend 100% complete - demo ready - backend not yet started

---

## VISION

ZedMarkets is Zambia's first fully verified online marketplace. The core problem it solves
is trust - Zambian buyers have been burned by fake sellers on Facebook, WhatsApp groups,
and other informal platforms. ZedMarkets fixes this by requiring every seller to submit
a government-issued ID before listing anything, awarding a visible blue Verified badge
to approved sellers, and keeping all payments and communications on the platform so
there is a record of every transaction.

The target market is all 9 provinces of Zambia. Categories include electronics, clothing,
food and agriculture, property, vehicles, services, health and beauty, sports, and books.
The business model is a 3-5% platform fee on completed transactions, with optional paid
seller tiers (Pro at K199/month, Business at K499/month) for priority placement and
unlimited listings.

---

## WHAT HAS BEEN BUILT TODAY (Frontend - complete)

### All pages (14 total)

Home (/)
- Full-screen hero with real Unsplash photos matching Zambian market context
- Search bar that routes to /listings with URL params
- Category grid with photo backgrounds linking to filtered listings
- Featured products section pulling from products data (8 products)
- Trust section explaining verification, ratings, reporting, support
- Call to action section linking to /register?role=seller
- Stats: 1,240 verified sellers, 8,500 listings, zero tolerance for scams

Listings (/listings)
- Reads category and search from URL params on load
- Search works across name, seller, location, category, condition, description, tags, specs
- Match keyword highlighted in amber on product cards
- Tag badges shown when a tag matches the search
- Category filter pills update URL params without page reload
- Sort by newest, price low to high, price high to low
- Clear all filters button
- Empty state with helpful message and reset button

Product Detail (/product/:id)
- 3-image gallery with thumbnail switcher
- Colour selector with validation
- Size/option selector (adapts label by category - Size for clothing, Lease Term for property, etc)
- Shipping option selector with prices and delivery times
- Quantity picker capped at stock level
- Live total calculation showing subtotal + delivery
- Add to Cart button with 2-second success feedback
- Buy Now button adds to cart and goes to checkout
- WhatsApp chat button opens pre-filled message to seller
- 4-tab section: description, specifications table, reviews with star breakdown, seller info
- Related products grid at bottom
- Low stock badge when 3 or fewer remaining
- Verified seller badge on product

Cart (/cart)
- Product thumbnails clickable back to product page
- Quantity increase/decrease per item
- Remove individual items
- Clear entire cart
- Sticky order summary sidebar
- Delivery note saying arranged with seller
- Proceed to Checkout button

Checkout (/checkout)
- Step 1: Delivery address form (pre-filled from logged in user data)
- Step 2: Shipping carrier selection with 6 options and prices
- Step 3: Full payment gateway (7 methods - see below)
- Step 4: Order confirmation with transaction reference number
- Order summary sidebar visible throughout all steps
- On completion: saves order to buyer account if logged in

Register (/register)
- Pre-selects Seller tab when accessed from /register?role=seller
- Role toggle: I want to Buy vs I want to Sell
- Step 1: First name, last name, email, phone, password, confirm password, province, town
- Step 2 (Seller): Business name, business type, NRC number, product categories (multi-select), description, website
- Step 2 (Buyer): Preferred categories, delivery address
- Step 3: ID verification - choose NRC/Passport/Drivers License, enter ID number, upload ID photo (simulated click), optional selfie
- Submit triggers 2-second verification animation then awards blue Verified badge
- Skip option available (can verify later from dashboard settings)
- Full validation with red error messages on all required fields

Login (/login)
- Demo account banner showing test credentials
- Email and password with Enter key support
- 600ms loading animation
- Role-based redirect: sellers go to /seller/dashboard, buyers go to /buyer/dashboard
- Demo seller: seller@demo.com / demo123
- Demo buyer: buyer@demo.com / demo123

Seller Dashboard (/seller/dashboard)
- Dark sidebar with avatar, business name, verified badge, sign out
- Add New Listing button in sidebar
- Tab: Overview - total revenue, active listings, product views, cart adds stats cards
  plus recent sales list and listings preview with hover to full listings tab
- Tab: Listings - full list of all listings with image, name, category, date, views, cart adds, sold count, status badge, remove button
  Empty state with link to add first listing
- Tab: Orders - table showing order ID, product, buyer name, amount, status badge
- Tab: Analytics - revenue, total views, conversion rate, cart add rate cards
  plus per-listing performance breakdown with views/cart adds/sales
- Tab: Settings - full business profile display, identity verification status

Add Listing (/seller/add-listing)
- Protected: redirects to login if not a seller
- Left column: product name, category dropdown, condition dropdown, description textarea, colours (comma separated), sizes/options (comma separated)
- Right column: price, stock quantity, province, town, image URL with live preview
- Full validation
- On submit: adds to seller's listings in AuthContext, shows success banner, redirects to dashboard after 1.8 seconds

Buyer Dashboard (/buyer/dashboard)
- Dark sidebar with avatar, name, province, browse products button, sign out
- Tab: Overview - total orders, delivered count, processing count stats cards plus recent orders list
- Tab: Orders - full list of all orders with product image, name, seller, date, amount, status badge
- Tab: Saved - empty state with browse products link
- Tab: Settings - full personal details display

Seller Profile (/seller/:sellerId)
- Public page accessible to any visitor including buyers
- Dark header with seller avatar, name, blue verified badge, rating, sales count, province, member since
- WhatsApp button in header
- Left sidebar: seller info table, about description, verified identity confirmation box, contact via WhatsApp
- Main area: all products by this seller in a clickable grid
- Three pre-configured demo seller profiles: techzed-lusaka, mama-grace-designs, choma-farms
- Falls back gracefully for any other seller ID

Sell (/sell)
- If logged in as seller: shows Go to My Dashboard button
- If not logged in: shows Start selling for free linking to /register?role=seller
- Mock seller dashboard preview showing revenue/listings/sales/views stats
- 4-step how it works with blue badge callout on step 3
- Trust cards: verified badge, phone/WhatsApp visible, on-platform transactions, seller protection
- 3-tier pricing: Free (K0), Pro (K199/month), Business (K499/month)
- All plan CTAs are real links to /register?role=seller or /contact

About (/about)
- Dark hero with real Unsplash photo background
- Mission section with side photo
- Stats bar: founded 2022, 1240 sellers, 8500 listings, 9 provinces
- Team section with 4 team members and Unsplash portrait photos

Contact (/contact)
- Left column: office address, phone, email, support hours, Lusaka photo
- Right column: working contact form with name, email, subject, message
- On submit: shows success confirmation message

### Components

Navbar
- Top bar (32px): free delivery notice, phone number, sell link, about, help
- Main nav (60px): ZedMarkets logo, All Categories dropdown (9 categories with URL param links), search bar with button, Browse and Sell links, cart icon with count badge, account menu
- Account menu when logged in: shows name, email, verified badge, role-specific links, sign out
- Account menu when logged out: Sign In and Register buttons
- Categories dropdown passes ?category= URL param to /listings
- Search bar routes to /listings?search= on Enter or button click
- Total height 92px with spacer div at bottom handling page offset

Footer
- 5 columns: ZedMarkets brand + address + payment badges, Marketplace links, Categories (all 9 with URL params), Company, Support
- Newsletter subscribe section with email input
- Bottom bar: copyright, payment method badges (Airtel Money, MTN MoMo, Visa, Zanaco)
- All category links pass ?category= URL param
- All support and company links go to real pages

PaymentGateway component
- 7 payment methods in a 2-column grid selector
- Airtel Money: phone number field, OTP push notification
- MTN Mobile Money: phone number field, OTP prompt
- Zamtel Kwacha: phone number field, USSD prompt
- Visa/Mastercard: card number, name on card, expiry, CVV (shows +K25 processing fee)
- Zanaco Bank Transfer: account number, PIN
- Stanbic Bank: account number, PIN
- Cash on Delivery: no fields, direct to confirmation
- Confirm screen shows payment summary with fee breakdown and OTP input
- OTP demo code: 1234
- Processing spinner 2 seconds
- Success screen with transaction reference (ZM + timestamp)
- Fully reusable component - import and use anywhere

VerifiedBadge component
- Blue badge with checkmark SVG
- Size prop: sm (default), md, lg
- Used in Navbar account menu, seller dashboard sidebar, seller profile header, product detail badges

### Data layer

src/data/products.js - 12 products:
1. Samsung Galaxy A54 128GB - K2,800 - Electronics
2. Handmade Chitenge Dress - K350 - Clothing
3. Fresh Maize 50kg Bags - K280 - Food and Agri
4. HP Laptop Core i5 8GB - K5,500 - Electronics
5. Nike Air Force 1 Original - K1,200 - Clothing
6. 7-Seater Sofa Set - K4,800 - Services
7. Toyota Hilux 2020 - K185,000 - Vehicles
8. 3-Bedroom House Rental - K8,000/mo - Property
9. iPhone 13 Pro 256GB - K8,200 - Electronics
10. Fresh Tomatoes Crate - K120 - Food and Agri
11. Ergonomic Office Chair - K2,200 - Services
12. Yamaha FZ 150cc Bike - K22,000 - Vehicles

Each product has: id, name, price, display, seller, sellerRating, sellerSales, sellerPhone,
location, category, condition, stock, description, specs array, colors array, sizes array,
shipping options array, imgs array (3 Unsplash photos each), reviews array, tags array

src/context/AuthContext.jsx
- register(data): creates user object, sets state, returns user
- login(email, password, usersArray): finds match, sets state, returns user or null
- logout(): clears state
- updateUser(data): merges partial update
- verifyAccount(): sets verified=true and verifiedDate
- addListing(listing): appends to user.listings with auto id, date, views=0, cartAdds=0
- removeListing(id): filters from user.listings
- addOrder(order): appends to user.orders with auto id, date, status=Processing

src/context/CartContext.jsx
- addToCart(product): adds new or increments qty
- removeFromCart(id): filters out
- updateQty(id, qty): updates or removes if qty < 1
- clearCart(): resets to empty array
- total: computed ZMW total
- count: computed item count for badge

---

## WHAT IS NOT YET BUILT (Backend - 0% complete)

### Priority 1 - Core backend (required to go live)
- Database: PostgreSQL with tables for users, listings, orders, cart, reviews, messages
- REST API: Node.js with Express and Prisma ORM
- Authentication: JWT tokens in httpOnly cookies with refresh token rotation
- File uploads: Cloudinary or AWS S3 for product images and ID documents
- Password hashing: bcrypt with salt rounds
- Data persistence: all state is in-memory only - browser refresh loses everything

### Priority 2 - Payments (required to go live)
- Airtel Money API (register at developer.airtel.africa)
- MTN Mobile Money API (register at momodeveloper.mtn.com)
- Visa and Mastercard via Flutterwave (easiest for Zambia, supports all methods)
- Zamtel API (contact Zamtel business team directly in Lusaka)
- Escrow system: hold buyer funds until delivery confirmed, then release to seller minus fee
- Transaction records in database with full status history
- Automated receipt emails via SendGrid or AWS SES

### Priority 3 - ID Verification system
- Secure upload of ID photos to encrypted AWS S3 bucket
- Internal admin panel for ZedMarkets staff to view and review submitted IDs
- Approve or reject workflow with automated email to seller on decision
- Blue verified flag stored in database, not just frontend state
- NRC number format validation (Zambian format: XXXXXX/XX/X)
- Passport and drivers license format checks

### Priority 4 - On-platform messaging
- Real-time chat between buyer and seller within ZedMarkets
- Messages table in database linked to listings and to orders
- Socket.io for real-time delivery or 10-second polling fallback
- Unread message count badge in Navbar
- Full conversation history per buyer-seller pair
- WhatsApp kept as external fallback contact method only

### Priority 5 - Admin panel
- Separate staff login at /admin
- Dashboard showing all pending seller verification requests with ID photos
- Approve or reject sellers with one click
- View and remove reported listings
- All transactions with filtering by date, amount, status
- Feature specific products on the home page
- Platform analytics: daily GMV, active sellers, new registrations, orders

### Priority 6 - Infrastructure
- Domain: zedmarkets.zm from ZICTA (approx $40/year, requires Zambian company registration)
- Frontend: Netlify or Vercel (free tier handles large traffic at launch)
- Backend: Railway or Render ($5-10/month)
- Database: Railway PostgreSQL or Supabase (free tier up to 500MB)
- SSL: auto-provisioned by Netlify and Railway
- Environment variables: .env file for all secrets, never committed to git
- CI/CD: GitHub Actions deploy on push to main

### Priority 7 - Legal and compliance
- PACRA registration: register ZedMarkets Ltd or ZedMarkets Zambia Ltd
- Business bank account: Zanaco or Stanbic business account
- ZRA registration: get TIN number for tax purposes
- Terms of Service: drafted with Zambian commercial lawyer (K3,000-K5,000)
- Privacy Policy: must cover data collection, ID storage, payment data
- ZICTA compliance: notify as electronic marketplace operator
- Platform fee decision: recommend 3-5% of each completed transaction
- Refund and dispute policy: document before launch

---

## RECOMMENDED TECH STACK FOR BACKEND

Frontend:    React + Vite - already built - deploy to Netlify
Backend:     Node.js + Express + Prisma ORM
Database:    PostgreSQL on Railway or Supabase
Auth:        JWT (access token 15min + refresh token 7 days) + bcrypt
Files:       Cloudinary free tier (25GB, 25 credits/month)
Email:       SendGrid free tier (100 emails/day)
Payments:    Flutterwave (one API for Airtel, MTN, Visa, bank transfer in Zambia)
Realtime:    Socket.io v4 for chat
Hosting:     Railway (backend + DB combined ~$5/month)
Domain:      zedmarkets.zm via ZICTA
Monitoring:  UptimeRobot (free) for uptime alerts

---

## TIMELINE AND COST TO MARKET READY

Phase 1 - GitHub and Netlify demo:          1 day       Free
Phase 2 - Backend API and auth:             2-3 weeks   $10/month
Phase 3 - Payment integration:              1 week      3-5% per transaction
Phase 4 - ID verification and admin panel:  1 week      $5/month S3
Phase 5 - On-platform messaging:            1-2 weeks   Included in hosting
Phase 6 - Legal and compliance:             2-4 weeks   K5,000-K10,000
Phase 7 - Domain registration:              1 day       ~$40/year
Phase 8 - Beta testing (20 sellers):        2 weeks     Free
Phase 9 - Public launch:                    -           -

Total time: 8-12 weeks after frontend
Total investment: approx K15,000-K25,000 including legal, hosting, and domain

---

## NEXT STEPS IN ORDER

1.  Frontend complete - DONE
2.  Write CONTEXT.md - DONE
3.  Push to GitHub at https://github.com/Wise222/zedmarkets
4.  Build dist folder and drag to netlify.com/drop for live demo URL
5.  Share demo URL with potential clients and investors
6.  Start backend: new folder zedmarkets-api, npm init, install express prisma bcrypt jsonwebtoken
7.  Design PostgreSQL schema (users, listings, orders, cart, reviews, messages, verifications)
8.  Build auth endpoints: POST /auth/register, POST /auth/login, POST /auth/refresh
9.  Replace frontend AuthContext register and login with fetch calls to real API
10. Build listings CRUD endpoints
11. Integrate Cloudinary for image uploads in AddListing page
12. Integrate Flutterwave for payments
13. Build admin panel for ID verification
14. Set up Socket.io for buyer-seller chat
15. Legal: PACRA registration, bank account, ZRA, Terms of Service
16. Beta launch: invite 10-20 Lusaka sellers, test full buyer flow end to end
17. Fix issues from beta, then public launch

---

## GIT AND DEPLOYMENT

Repository: https://github.com/Wise222/zedmarkets

Push commands (run one at a time in PowerShell):
  cd D:\Projects\zedmarkets
  git remote add origin https://github.com/Wise222/zedmarkets.git
  git push -u origin main

If git is not initialized yet:
  git init
  git add .
  git commit -m "feat: complete ZedMarkets frontend v1.0"
  git branch -M main
  git remote add origin https://github.com/Wise222/zedmarkets.git
  git push -u origin main

Build and deploy to Netlify:
  npm run build
  Go to netlify.com/drop and drag the dist folder
  Live URL received immediately - share with clients

Auto-deploy setup on Netlify:
  Go to app.netlify.com
  Add new site - Import from Git - connect GitHub
  Select Wise222/zedmarkets repo
  Build command: npm run build
  Publish directory: dist
  Every push to main auto-deploys

Deploy backend to Render (when ready):
  Create account at render.com
  New Web Service - connect Wise222/zedmarkets-api repo
  Build command: npm install
  Start command: node server.js
  Add environment variables in Render dashboard

---

## TECHNICAL NOTES

- All frontend state is React context (in-memory) - no database, no persistence
- Demo data hardcoded in src/data/products.js - 12 products
- Replace context files with fetch/axios API calls when backend is ready
- PaymentGateway is a standalone reusable component - import anywhere
- VerifiedBadge accepts size prop: sm (default), md, lg
- Search uses URL params - results pages are shareable links
- Navbar total height 92px: 32px top bar + 60px main nav
- Spacer div at end of Navbar.jsx provides the 92px page offset automatically
- vite.config.js has no base path - correct for Netlify root deployment
- public/_redirects contains: /*    /index.html   200 - handles React Router on Netlify
- node_modules excluded by .gitignore - run npm install after cloning
- No TypeScript - plain JavaScript React throughout
- All images are Unsplash URLs with width and quality params for performance