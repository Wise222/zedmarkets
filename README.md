# Zed Markets

A peer-to-peer marketplace web app where buyers and sellers can list products, manage carts, and complete purchases — built with React and Vite.

## Live Demo

https://zedmarkets.netlify.app/

## What It Does

Zed Markets is a frontend marketplace where sellers can create listings and manage their seller dashboard, and buyers can browse products, add to cart, checkout, and track purchases from their buyer dashboard. Authentication is handled via React Context.

## Tech Stack

- React + Vite
- React Context API (auth and cart state)
- React Router (client-side routing)
- CSS (component styles)
- Deployed on Netlify

## Getting Started

### Prerequisites

- Node.js 18+

### Install

git clone https://github.com/your-username/zedmarkets.git
cd zedmarkets
npm install

### Run Locally

npm run dev

Open http://localhost:5173

### Build for Production

npm run build

## Project Structure

src/pages
  Home.jsx           - Landing page
  Listings.jsx       - Browse all product listings
  ProductDetail.jsx  - Individual product page
  Cart.jsx           - Shopping cart
  Checkout.jsx       - Checkout flow
  BuyerDashboard.jsx - Buyer order history and account
  Sell.jsx           - Seller landing page
  AddListing.jsx     - Create a new product listing
  SellerDashboard.jsx - Seller product and order management
  SellerProfile.jsx  - Public seller profile
  Login.jsx          - Login page
  Register.jsx       - Register page
  About.jsx          - About page
  Contact.jsx        - Contact page
src/components
  Navbar.jsx         - Site navigation
  Footer.jsx         - Site footer
  PaymentGateway.jsx - Payment UI component
  VerifiedBadge.jsx  - Seller verified badge
src/context
  AuthContext.jsx    - Global authentication state
  CartContext.jsx    - Global cart state
src/data
  products.js        - Static product data

## Key Features

- Buyer and seller roles with separate dashboards
- Product listings with detail pages
- Add to cart and checkout flow
- Seller profile pages with verified badge
- Auth state managed globally via React Context
- Cart state persisted via React Context
- Client-side routing with React Router
- Netlify redirects configured for SPA routing

## Deployment

Live at https://zedmarkets.netlify.app/

Deployed on Netlify. The public/_redirects file handles client-side routing so page refreshes work correctly on Netlify.

## License

MIT
