import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const categories = ["Electronics","Clothing","Food & Agri","Property","Vehicles","Services","Health & Beauty","Sports","Books & Education","Other"]
const conditions = ["Brand New","Used - Excellent","Used - Good","Used - Fair","Refurbished","Fresh / Harvested"]
const provinces = ["Lusaka","Copperbelt","Central","Eastern","Western","Northern","Luapula","North-Western","Southern","Muchinga"]

export default function AddListing() {
  const { user, addListing } = useAuth()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "", category: "", condition: "", price: "", description: "",
    province: "", town: "", colors: "", sizes: "",
    img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&q=80",
    stock: "", phone: ""
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.category) e.category = "Select a category"
    if (!form.condition) e.condition = "Select condition"
    if (!form.price || isNaN(Number(form.price))) e.price = "Enter a valid price"
    if (!form.description.trim()) e.description = "Required"
    if (!form.province) e.province = "Required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const listing = {
      ...form, price: Number(form.price),
      display: `K${Number(form.price).toLocaleString()}`,
      colors: form.colors ? form.colors.split(",").map(s => s.trim()) : [],
      sizes: form.sizes ? form.sizes.split(",").map(s => s.trim()) : [],
      imgs: [form.img],
      seller: user.businessName || `${user.firstName} ${user.lastName}`,
      sellerRating: 5.0, sellerSales: 0, sellerPhone: form.phone || user.phone,
      location: form.town || form.province,
    }
    addListing(listing)
    setSubmitted(true)
    setTimeout(() => navigate("/seller/dashboard"), 1800)
  }

  if (!user || user.role !== "seller") return (
    <div style={{ paddingTop: "2rem", textAlign: "center" }}>
      <Link to="/login" style={{ color: "#1a5c2e", fontWeight: 600 }}>Sign in as a seller first</Link>
    </div>
  )

  const field = (key, label, type = "text", placeholder = "") => (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
        style={{ width: "100%", padding: "0.75rem 1rem", border: errors[key] ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
      {errors[key] && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors[key]}</div>}
    </div>
  )

  const sel = (key, label, options) => (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{label}</label>
      <select value={form[key]} onChange={e => set(key, e.target.value)}
        style={{ width: "100%", padding: "0.75rem 1rem", border: errors[key] ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", background: "#fff", boxSizing: "border-box" }}>
        <option value="">Select...</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {errors[key] && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors[key]}</div>}
    </div>
  )

  return (
    <div style={{ paddingTop: "0", minHeight: "100vh", background: "#fafaf8" }}>
      <div style={{ background: "#0f1a13", padding: "2.5rem 5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.5px" }}>Add New Listing</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.83rem", marginTop: "4px" }}>Fill in the details below to publish your product</p>
        </div>
        <Link to="/seller/dashboard" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.83rem" }}>Back to Dashboard</Link>
      </div>

      <div style={{ padding: "3rem 5rem", maxWidth: "900px" }}>
        {submitted && (
          <div style={{ background: "#e6f5ec", border: "1px solid #1a5c2e", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1a5c2e" }} />
            <span style={{ color: "#1a5c2e", fontWeight: 600, fontSize: "0.88rem" }}>Listing published successfully! Redirecting to dashboard...</span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.5rem" }}>Product Details</h3>
            {field("name", "Product Name", "text", "e.g. Samsung Galaxy A54 128GB")}
            {sel("category", "Category", categories)}
            {sel("condition", "Condition", conditions)}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Description</label>
              <textarea rows={4} placeholder="Describe your product in detail. Include key features, what is included, and any important notes for buyers." value={form.description} onChange={e => set("description", e.target.value)}
                style={{ width: "100%", padding: "0.75rem 1rem", border: errors.description ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              {errors.description && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors.description}</div>}
            </div>
            {field("colors", "Colours Available (comma separated)", "text", "e.g. Black, White, Blue")}
            {field("sizes", "Sizes / Options (comma separated)", "text", "e.g. S, M, L, XL or 32GB, 64GB")}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.5rem" }}>Pricing & Stock</h3>
              {field("price", "Price (ZMW)", "number", "e.g. 2800")}
              {field("stock", "Stock Available", "number", "e.g. 5")}
            </div>

            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.5rem" }}>Location</h3>
              {sel("province", "Province", provinces)}
              {field("town", "Town / City", "text", "Lusaka")}
            </div>

            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.5rem" }}>Product Image URL</h3>
              <p style={{ fontSize: "0.75rem", color: "#9aada0", marginBottom: "1rem" }}>Paste an image URL from Unsplash or your own image host</p>
              {field("img", "Image URL", "text", "https://images.unsplash.com/...")}
              {form.img && (
                <div style={{ borderRadius: "10px", overflow: "hidden", height: "140px", marginTop: "0.5rem" }}>
                  <img src={form.img} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "2rem" }}>
          <Link to="/seller/dashboard" style={{ flex: 1, padding: "1rem", background: "transparent", color: "#1a5c2e", border: "1.5px solid #1a5c2e", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, textAlign: "center" }}>
            Cancel
          </Link>
          <button onClick={handleSubmit} style={{ flex: 2, padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  )
}