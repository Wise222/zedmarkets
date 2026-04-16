import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const DEMO_USERS = [
  { id: 1, email: "seller@demo.com", password: "demo123", role: "seller", firstName: "Chanda", lastName: "Mwamba", phone: "+260971234567", province: "Lusaka", businessName: "TechZed Lusaka", categories: ["Electronics"], description: "Your trusted electronics shop in Lusaka.", joinedDate: "January 2023", listings: [
    { id: 101, name: "Samsung Galaxy A54", price: 2800, display: "K2,800", category: "Electronics", status: "Active", views: 142, cartAdds: 23, sales: 8, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", dateAdded: "12/01/2025" },
    { id: 102, name: "HP Laptop Core i5", price: 5500, display: "K5,500", category: "Electronics", status: "Active", views: 98, cartAdds: 15, sales: 3, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", dateAdded: "15/01/2025" },
  ], sales: [{ id: 201, product: "Samsung Galaxy A54", buyer: "Monde T.", amount: 2800, date: "14/01/2025", status: "Delivered" },{ id: 202, product: "HP Laptop", buyer: "Grace P.", amount: 5500, date: "16/01/2025", status: "Processing" }], orders: [], savedItems: [], cartViews: [] },
  { id: 2, email: "buyer@demo.com", password: "demo123", role: "buyer", firstName: "Grace", lastName: "Phiri", phone: "+260961234567", province: "Copperbelt", town: "Ndola", address: "Plot 456, Independence Ave, Ndola", joinedDate: "March 2024", categories: ["Clothing","Electronics"], listings: [], sales: [], orders: [
    { id: 301, product: "Nike Air Force 1", seller: "Sneaker King ZM", amount: 1200, date: "10/01/2025", status: "Delivered", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { id: 302, product: "Chitenge Dress", seller: "Mama Grace Designs", amount: 350, date: "05/01/2025", status: "Processing", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80" }
  ], savedItems: [], cartViews: [] }
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = () => {
    setError("")
    if (!form.email || !form.password) { setError("Please enter your email and password"); return }
    setLoading(true)
    setTimeout(() => {
      const found = login(form.email, form.password, DEMO_USERS)
      setLoading(false)
      if (found) navigate(found.role === "seller" ? "/seller/dashboard" : "/buyer/dashboard")
      else setError("Incorrect email or password. Try the demo accounts below.")
    }, 600)
  }

  return (
    <div style={{ paddingTop: "0", minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link to="/"><span style={{ color: "#0f1a13", fontWeight: 800, fontSize: "1.6rem" }}>Zed<span style={{ color: "#f0a84e" }}>Markets</span></span></Link>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f1a13", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Welcome back</h1>
          <p style={{ color: "#9aada0", fontSize: "0.88rem" }}>No account yet? <Link to="/register" style={{ color: "#1a5c2e", fontWeight: 600 }}>Create one free</Link></p>
        </div>

        <div style={{ background: "#fff8ed", border: "1px solid #f0a84e", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#c47b2b", marginBottom: "0.4rem" }}>Demo accounts to test</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7a6f", lineHeight: 1.8 }}>
            Seller: seller@demo.com / demo123<br />
            Buyer: buyer@demo.com / demo123
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.08)" }}>
          {error && <div style={{ background: "#fde8e8", color: "#e05050", fontSize: "0.82rem", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1.25rem" }}>{error}</div>}

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)}
              style={{ width: "100%", padding: "0.85rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13" }}>Password</label>
              <span style={{ fontSize: "0.75rem", color: "#1a5c2e", cursor: "pointer", fontWeight: 500 }}>Forgot password?</span>
            </div>
            <input type="password" placeholder="Your password" value={form.password} onChange={e => set("password", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{ width: "100%", padding: "0.85rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#9aada0" }}>New to ZedMarkets? </span>
            <Link to="/register" style={{ fontSize: "0.82rem", color: "#1a5c2e", fontWeight: 600 }}>Create a free account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}