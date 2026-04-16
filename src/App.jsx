import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Listings from "./pages/Listings"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Sell from "./pages/Sell"
import Contact from "./pages/Contact"
import Register from "./pages/Register"
import Login from "./pages/Login"
import SellerDashboard from "./pages/SellerDashboard"
import BuyerDashboard from "./pages/BuyerDashboard"
import Checkout from "./pages/Checkout"
import AddListing from "./pages/AddListing"
import SellerProfile from "./pages/SellerProfile"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/add-listing" element={<AddListing />} />
            <Route path="/seller/:sellerId" element={<SellerProfile />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App