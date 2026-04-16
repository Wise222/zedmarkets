import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { products } from "../data/products"

const categories = ["All","Electronics","Clothing","Food & Agri","Property","Vehicles","Services","Health & Beauty","Sports","Books & Education"]

export default function Listings() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [cat, setCat] = useState(searchParams.get("category") || "All")
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    const c = searchParams.get("category")
    const s = searchParams.get("search")
    if (c) setCat(c)
    if (s) setSearch(s)
  }, [searchParams])

  const handleCat = (c) => {
    setCat(c)
    if (c === "All") searchParams.delete("category")
    else searchParams.set("category", c)
    setSearchParams(searchParams)
  }

  let filtered = products
    .filter(p => cat === "All" || p.category === cat)
    .filter(p => {
      if (!search) return true
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    })

  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <div style={{ background: "#0f1a13", padding: "2.5rem 5rem" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
          {cat !== "All" ? cat : "All Products"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>
          {filtered.length} verified listings {cat !== "All" ? `in ${cat}` : "across Zambia"}
          {search && ` matching "${search}"`}
        </p>
      </div>

      <div style={{ padding: "1.25rem 5rem", background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => handleCat(c)} style={{
              padding: "0.4rem 1rem", borderRadius: "20px", border: "1.5px solid",
              borderColor: cat === c ? "#1a5c2e" : "rgba(0,0,0,0.12)",
              background: cat === c ? "#1a5c2e" : "#fff",
              color: cat === c ? "#fff" : "#555",
              fontSize: "0.78rem", fontWeight: cat === c ? 600 : 400, cursor: "pointer"
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ display: "flex", background: "#f4f6f4", borderRadius: "8px", overflow: "hidden", border: "1.5px solid rgba(0,0,0,0.1)" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && setSearchParams({ ...Object.fromEntries(searchParams), search })}
              placeholder="Search listings..." style={{ padding: "0.45rem 0.9rem", border: "none", fontSize: "0.83rem", outline: "none", background: "transparent", width: "180px" }} />
            <button onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), search })} style={{ background: "#1a5c2e", color: "#fff", border: "none", padding: "0 12px", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "0.45rem 0.8rem", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "8px", fontSize: "0.83rem", outline: "none", background: "#fff", cursor: "pointer" }}>
            <option value="newest">Newest first</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      <div style={{ padding: "2rem 5rem 5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f1a13", marginBottom: "0.5rem" }}>No listings found</div>
            <p style={{ fontSize: "0.85rem", color: "#9aada0", marginBottom: "1.5rem" }}>Try a different search or category.</p>
            <button onClick={() => { setCat("All"); setSearch(""); setSearchParams({}) }} style={{ background: "#1a5c2e", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {filtered.map(p => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden", background: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                  <img src={p.imgs[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.92)", color: "#1a5c2e", fontSize: "0.6rem", fontWeight: 700, padding: "3px 9px", borderRadius: "10px" }}>Verified</span>
                </div>
                <div style={{ padding: "1rem 1.1rem" }}>
                  <div style={{ fontSize: "0.62rem", color: "#1a5c2e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>{p.category}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#0f1a13", marginBottom: "3px" }}>{p.name}</div>
                  <div style={{ color: "#1a5c2e", fontWeight: 800, fontSize: "1.05rem", marginBottom: "6px" }}>{p.display}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{p.seller}</div>
                    <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{p.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}