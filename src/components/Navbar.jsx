import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const categories = ["Electronics","Clothing","Food & Agri","Property","Vehicles","Services","Health & Beauty","Sports","Books & Education"]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { count } = useCart()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [search, setSearch] = useState("")
  const menuRef = useRef(null)
  const catRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/listings?search=${encodeURIComponent(search.trim())}`)
      setSearch("")
    }
  }

  const navLink = (to, label) => (
    <Link to={to} style={{
      color: pathname === to ? "#f0a84e" : "rgba(255,255,255,0.75)",
      fontSize: "0.88rem", fontWeight: pathname === to ? 600 : 400,
      paddingBottom: "3px", borderBottom: pathname === to ? "2px solid #f0a84e" : "2px solid transparent",
      whiteSpace: "nowrap"
    }}>{label}</Link>
  )

  return (
    <>
      {/* Top bar */}
      <div style={{ background: "#1a5c2e", height: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5rem", position: "fixed", top: 0, left: 0, right: 0, zIndex: 201 }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Free delivery on orders over K500 in Lusaka</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Support: +260 97 123 4567</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {!user && <>
            <Link to="/login" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Sign In</Link>
            <Link to="/register" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Create Account</Link>
          </>}
          <Link to="/sell" style={{ color: "#f0a84e", fontSize: "0.72rem", fontWeight: 600 }}>Sell on ZedMarkets</Link>
          <Link to="/about" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>About</Link>
          <Link to="/contact" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Help</Link>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "0 5rem", height: "60px", background: "#0f1a13", position: "fixed", top: "32px", left: 0, right: 0, zIndex: 200, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.5px" }}>Zed<span style={{ color: "#f0a84e" }}>Markets</span></span>
        </Link>

        {/* Categories dropdown */}
        <div ref={catRef} style={{ position: "relative", flexShrink: 0 }}>
          <button onClick={() => setCatOpen(o => !o)} style={{
            display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "0.45rem 1rem",
            cursor: "pointer", color: "#fff", fontSize: "0.83rem", fontWeight: 500, whiteSpace: "nowrap"
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            All Categories
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          {catOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", borderRadius: "12px", padding: "0.5rem 0", minWidth: "220px", border: "1px solid rgba(0,0,0,0.1)", zIndex: 400 }}>
              <div style={{ padding: "0.5rem 1rem 0.25rem", fontSize: "0.68rem", fontWeight: 700, color: "#9aada0", textTransform: "uppercase", letterSpacing: "0.1em" }}>Browse by category</div>
              {categories.map(c => (
                <Link key={c} to={`/listings?category=${encodeURIComponent(c)}`} onClick={() => setCatOpen(false)}
                  style={{ display: "block", padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#0f1a13", fontWeight: 500, borderBottom: "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f4f7f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  {c}
                </Link>
              ))}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", marginTop: "4px", padding: "4px 0" }}>
                <Link to="/listings" onClick={() => setCatOpen(false)} style={{ display: "block", padding: "0.6rem 1rem", fontSize: "0.83rem", color: "#1a5c2e", fontWeight: 600 }}>View all listings</Link>
              </div>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div style={{ flex: 1, display: "flex", background: "#fff", borderRadius: "8px", overflow: "hidden", maxWidth: "520px" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products, sellers, brands..."
            style={{ flex: 1, padding: "0.55rem 1rem", border: "none", fontSize: "0.85rem", outline: "none", color: "#0f1a13" }}
          />
          <button onClick={() => search.trim() && navigate(`/listings?search=${encodeURIComponent(search.trim())}`)}
            style={{ background: "#1a5c2e", color: "#fff", border: "none", padding: "0 1.1rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {navLink("/listings", "Browse")}
          {navLink("/sell", "Sell")}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginLeft: "auto", flexShrink: 0 }}>
          <Link to="/cart" style={{ position: "relative", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", flexDirection: "column", gap: "1px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.5)" }}>Cart</span>
            {count > 0 && <span style={{ position: "absolute", top: "-6px", right: "-8px", background: "#c47b2b", color: "#fff", fontSize: "0.55rem", fontWeight: 800, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
          </Link>

          {user ? (
            <div ref={menuRef} style={{ position: "relative" }}>
              <button onClick={() => setMenuOpen(o => !o)} style={{
                display: "flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "0.4rem 0.85rem",
                cursor: "pointer", color: "#fff"
              }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: user.role === "seller" ? "#1a5c2e" : "#c47b2b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800 }}>
                  {user.firstName[0]}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, lineHeight: 1.2 }}>{user.firstName}</div>
                  <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)" }}>{user.role === "seller" ? "Seller" : "Buyer"}</div>
                </div>
                {user.verified && <span style={{ background: "#1d6ce6", color: "#fff", fontSize: "0.55rem", fontWeight: 800, padding: "1px 5px", borderRadius: "6px" }}>V</span>}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", borderRadius: "12px", padding: "0.5rem 0", minWidth: "210px", border: "1px solid rgba(0,0,0,0.1)", zIndex: 300 }}>
                  <div style={{ padding: "0.75rem 1.1rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1a13" }}>{user.firstName} {user.lastName}</div>
                      {user.verified && <span style={{ background: "#1d6ce6", color: "#fff", fontSize: "0.58rem", fontWeight: 800, padding: "1px 6px", borderRadius: "8px" }}>Verified</span>}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{user.email}</div>
                  </div>
                  {user.role === "seller" ? (
                    <>
                      <Link to="/seller/dashboard" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        Seller Dashboard
                      </Link>
                      <Link to="/seller/add-listing" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add New Listing
                      </Link>
                      <Link to="/seller/dashboard" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                        My Orders Received
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/buyer/dashboard" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        My Dashboard
                      </Link>
                      <Link to="/buyer/dashboard" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                        My Orders
                      </Link>
                      <Link to="/cart" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.65rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        My Cart {count > 0 && `(${count})`}
                      </Link>
                    </>
                  )}
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "4px 0" }}>
                    <Link to={user.role === "seller" ? "/seller/dashboard" : "/buyer/dashboard"} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "0.6rem 1.1rem", fontSize: "0.83rem", color: "#0f1a13" }}>Account Settings</Link>
                    <button onClick={() => { logout(); setMenuOpen(false); navigate("/") }} style={{ display: "block", width: "100%", padding: "0.6rem 1.1rem", fontSize: "0.83rem", color: "#e05050", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to="/login" style={{ color: "rgba(255,255,255,0.75)", padding: "0.45rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" }}>Sign In</Link>
              <Link to="/register" style={{ background: "#c47b2b", color: "#fff", padding: "0.5rem 1.1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>Register</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: "92px" }} />
    </>
  )
}