import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProduct, getRelated } from "../data/products"
import { useCart } from "../context/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = getProduct(id)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState("description")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedShipping, setSelectedShipping] = useState(0)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImg(0)
    setQty(1)
    setAdded(false)
    setTab("description")
    if (product) {
      setSelectedColor(product.colors.length > 0 ? product.colors[0] : "")
      setSelectedSize(product.sizes.length > 0 ? "" : "N/A")
      setSelectedShipping(0)
      setErrors({})
    }
  }, [id])

  if (!product) return (
    <div style={{ paddingTop: "2rem", textAlign: "center", minHeight: "60vh", background: "#fafaf8" }}>
      <h2 style={{ color: "#0f1a13", marginBottom: "1rem" }}>Product not found</h2>
      <Link to="/listings" style={{ color: "#1a5c2e", fontWeight: 600 }}>Back to listings</Link>
    </div>
  )

  const related = getRelated(product)
  const shippingCost = product.shipping[selectedShipping]?.price || 0
  const totalPrice = product.price * qty + shippingCost

  const validate = () => {
    const e = {}
    if (product.colors.length > 0 && !selectedColor) e.color = "Please select a colour"
    if (product.sizes.length > 0 && (!selectedSize || selectedSize === "")) e.size = "Please select a size / option"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAdd = () => {
    if (!validate()) return
    for (let i = 0; i < qty; i++) addToCart({ ...product, selectedColor, selectedSize, selectedShipping: product.shipping[selectedShipping]?.label })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const handleBuyNow = () => {
    if (!validate()) return
    for (let i = 0; i < qty; i++) addToCart({ ...product, selectedColor, selectedSize, selectedShipping: product.shipping[selectedShipping]?.label })
    navigate("/cart")
  }

  const Stars = ({ rating, size = 15 }) => (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.floor(rating) ? "#f0a84e" : "#ddd", fontSize: size }}>
          {i < Math.floor(rating) ? "\u2605" : "\u2606"}
        </span>
      ))}
    </span>
  )

  const avgReview = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length

  return (
    <div style={{ paddingTop: "0", background: "#fafaf8", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0.85rem 5rem", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#9aada0", flexWrap: "wrap" }}>
        <Link to="/" style={{ color: "#9aada0" }}>Home</Link>
        <span>/</span>
        <Link to="/listings" style={{ color: "#9aada0" }}>Listings</Link>
        <span>/</span>
        <Link to="/listings" style={{ color: "#9aada0" }}>{product.category}</Link>
        <span>/</span>
        <span style={{ color: "#0f1a13", fontWeight: 500 }}>{product.name}</span>
      </div>

      {/* Main grid */}
      <div style={{ padding: "3rem 5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", maxWidth: "1300px" }}>

        {/* LEFT â€” Images */}
        <div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "440px", background: "#f4f7f5", marginBottom: "12px", position: "relative" }}>
            <img src={product.imgs[activeImg]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {product.stock <= 3 && product.stock > 0 && (
              <div style={{ position: "absolute", top: "14px", left: "14px", background: "#e05050", color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>
                Only {product.stock} left!
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {product.imgs.map((src, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{
                width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                border: activeImg === i ? "2.5px solid #1a5c2e" : "2px solid rgba(0,0,0,0.1)",
                opacity: activeImg === i ? 1 : 0.6, transition: "all 0.15s", flexShrink: 0
              }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: "1.5rem", background: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.85rem" }}>Why buy safely on ZedMarkets</div>
            {[["Verified Seller", "Identity confirmed by ZedMarkets"],["Secure Messaging", "Chat protected on our platform"],["Report Issues", "24-hour dispute resolution team"],["Buyer Protection", "Report problems within 7 days"]].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: "10px", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1a5c2e", flexShrink: 0, marginTop: "5px" }} />
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13" }}>{t}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT â€” Details */}
        <div>
          {/* Badges */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#e6f5ec", color: "#1a5c2e", fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>Verified Seller</span>
            <span style={{ background: "#fef3e2", color: "#c47b2b", fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>{product.condition}</span>
            <span style={{ background: "#f0f0f0", color: "#555", fontSize: "0.65rem", fontWeight: 600, padding: "4px 10px", borderRadius: "20px" }}>{product.category}</span>
            {product.stock <= 5 && <span style={{ background: "#fde8e8", color: "#e05050", fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>Low Stock</span>}
          </div>

          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f1a13", lineHeight: 1.15, marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
            <Stars rating={avgReview} />
            <span style={{ fontSize: "0.83rem", color: "#6b7a6f" }}>{avgReview.toFixed(1)} &bull; {product.reviews.length} reviews &bull; {product.sellerSales} sold</span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#1a5c2e", letterSpacing: "-1.5px", lineHeight: 1 }}>{product.display}</div>
            <div style={{ fontSize: "0.75rem", color: "#9aada0", marginTop: "4px" }}>Price in Zambian Kwacha (ZMW) &bull; {product.stock} in stock</div>
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "1.5rem", marginBottom: "1.5rem" }} />

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.6rem" }}>
                Colour: <span style={{ fontWeight: 400, color: "#6b7a6f" }}>{selectedColor}</span>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.colors.map(c => (
                  <button key={c} onClick={() => { setSelectedColor(c); setErrors(e => ({ ...e, color: null })) }} style={{
                    padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 500,
                    border: selectedColor === c ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.15)",
                    background: selectedColor === c ? "#e6f5ec" : "#fff",
                    color: selectedColor === c ? "#1a5c2e" : "#0f1a13",
                    transition: "all 0.15s"
                  }}>{c}</button>
                ))}
              </div>
              {errors.color && <div style={{ color: "#e05050", fontSize: "0.75rem", marginTop: "5px" }}>{errors.color}</div>}
            </div>
          )}

          {/* Size / Option selector */}
          {product.sizes.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.6rem" }}>
                {product.category === "Clothing" ? "Size" : product.category === "Property" ? "Lease Term" : product.category === "Food & Agri" ? "Quantity" : "Option"}:
                {selectedSize && <span style={{ fontWeight: 400, color: "#6b7a6f" }}> {selectedSize}</span>}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setErrors(e => ({ ...e, size: null })) }} style={{
                    padding: "0.45rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 500,
                    border: selectedSize === s ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.15)",
                    background: selectedSize === s ? "#e6f5ec" : "#fff",
                    color: selectedSize === s ? "#1a5c2e" : "#0f1a13",
                    transition: "all 0.15s"
                  }}>{s}</button>
                ))}
              </div>
              {errors.size && <div style={{ color: "#e05050", fontSize: "0.75rem", marginTop: "5px" }}>{errors.size}</div>}
            </div>
          )}

          {/* Shipping selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.6rem" }}>Delivery / Collection Option:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {product.shipping.map((s, i) => (
                <div key={i} onClick={() => setSelectedShipping(i)} style={{
                  padding: "0.85rem 1rem", borderRadius: "10px", cursor: "pointer",
                  border: selectedShipping === i ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.1)",
                  background: selectedShipping === i ? "#e6f5ec" : "#fff",
                  transition: "all 0.15s", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f1a13" }}>{s.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "2px" }}>{s.days} &bull; {s.note}</div>
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: s.price === 0 ? "#1a5c2e" : "#0f1a13", flexShrink: 0, marginLeft: "1rem" }}>
                    {s.price === 0 ? "Free" : `K${s.price}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1a13" }}>Quantity:</div>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "7px 16px", border: "none", background: "#fff", fontSize: "1.1rem", cursor: "pointer", color: "#0f1a13" }}>-</button>
              <span style={{ padding: "7px 18px", borderLeft: "1px solid rgba(0,0,0,0.1)", borderRight: "1px solid rgba(0,0,0,0.1)", fontSize: "0.92rem", fontWeight: 700, minWidth: "44px", textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ padding: "7px 16px", border: "none", background: "#fff", fontSize: "1.1rem", cursor: "pointer", color: "#0f1a13" }}>+</button>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#9aada0" }}>{product.stock} available</div>
          </div>

          {/* Total price */}
          {shippingCost > 0 && (
            <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "0.85rem 1.1rem", marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#9aada0" }}>Subtotal ({qty} item{qty > 1 ? "s" : ""})</div>
                <div style={{ fontSize: "0.75rem", color: "#9aada0" }}>Delivery</div>
                <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1a13", marginTop: "4px" }}>Total</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "#6b7a6f" }}>K{(product.price * qty).toLocaleString()}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7a6f" }}>K{shippingCost}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1a5c2e", marginTop: "4px" }}>K{totalPrice.toLocaleString()}</div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <button onClick={handleAdd} style={{
              flex: 1, padding: "1rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", border: "none",
              background: added ? "#1a5c2e" : "#f0a84e", color: "#fff", transition: "background 0.2s"
            }}>{added ? "Added to cart!" : "Add to Cart"}</button>
            <button onClick={handleBuyNow} style={{
              flex: 1, padding: "1rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", border: "none",
              background: "#1a5c2e", color: "#fff"
            }}>Buy Now</button>
          </div>

          <a href={`https://wa.me/${product.sellerPhone.replace(/\D/g,"")}?text=Hi, I saw your listing for ${encodeURIComponent(product.name)} on ZedMarkets. Is it still available?`}
            target="_blank" rel="noreferrer"
            style={{ display: "block", width: "100%", padding: "0.9rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", background: "#25D366", color: "#fff", border: "none", textAlign: "center" }}>
            Chat on WhatsApp
          </a>

          {/* Seller card */}
          <div style={{ marginTop: "1.5rem", background: "#fff", borderRadius: "12px", padding: "1.1rem", border: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#1a5c2e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>{product.seller[0]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f1a13" }}>{product.seller}</div>
              <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{product.location} &bull; {product.sellerSales} sales &bull; {product.sellerRating}/5</div>
            </div>
            <span style={{ background: "#e6f5ec", color: "#1a5c2e", fontSize: "0.62rem", fontWeight: 700, padding: "3px 9px", borderRadius: "10px" }}>Verified</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 5rem 2rem", maxWidth: "1300px" }}>
        <div style={{ display: "flex", borderBottom: "2px solid rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
          {["description", "specifications", "reviews", "seller"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "0.85rem 1.5rem", border: "none", background: "transparent", cursor: "pointer",
              fontSize: "0.88rem", fontWeight: tab === t ? 700 : 400,
              color: tab === t ? "#1a5c2e" : "#9aada0",
              borderBottom: tab === t ? "2px solid #1a5c2e" : "2px solid transparent",
              marginBottom: "-2px", textTransform: "capitalize"
            }}>{t}{t === "reviews" ? ` (${product.reviews.length})` : ""}</button>
          ))}
        </div>

        {tab === "description" && (
          <div style={{ maxWidth: "720px" }}>
            <p style={{ color: "#4a5550", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: "2rem" }}>{product.description}</p>
            <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f1a13", marginBottom: "1rem" }}>Highlights</div>
              {product.specs.slice(0, 4).map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "8px", marginBottom: "0.6rem" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1a5c2e", flexShrink: 0, marginTop: "6px" }} />
                  <span style={{ fontSize: "0.85rem", color: "#4a5550" }}><strong>{k}:</strong> {v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "specifications" && (
          <div style={{ maxWidth: "620px", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", overflow: "hidden" }}>
            {product.specs.map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", padding: "0.9rem 1.25rem",
                background: i % 2 === 0 ? "#fff" : "#f9fafb",
                borderBottom: i < product.specs.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none"
              }}>
                <span style={{ fontSize: "0.85rem", color: "#6b7a6f", fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: "0.85rem", color: "#0f1a13", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", background: "#fff", borderRadius: "14px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#0f1a13", lineHeight: 1 }}>{avgReview.toFixed(1)}</div>
                <Stars rating={avgReview} size={18} />
                <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "4px" }}>{product.reviews.length} reviews</div>
              </div>
              <div style={{ flex: 1, paddingLeft: "1.5rem", borderLeft: "1px solid rgba(0,0,0,0.07)" }}>
                {[5,4,3,2,1].map(star => {
                  const count = product.reviews.filter(r => r.rating === star).length
                  const pct = Math.round(count / product.reviews.length * 100)
                  return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.75rem", color: "#6b7a6f", width: "10px" }}>{star}</span>
                      <div style={{ flex: 1, height: "6px", background: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: "#f0a84e", borderRadius: "4px" }} />
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#9aada0", width: "28px" }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
            {product.reviews.map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e6f5ec", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#1a5c2e", fontWeight: 700, fontSize: "0.9rem" }}>{r.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f1a13" }}>{r.name}</div>
                      <Stars rating={r.rating} size={12} />
                    </div>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#9aada0" }}>Verified purchase</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#4a5550", lineHeight: 1.7, margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "seller" && (
          <div style={{ maxWidth: "500px" }}>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#1a5c2e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>{product.seller[0]}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f1a13" }}>{product.seller}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9aada0", marginTop: "2px" }}>{product.location}, Zambia</div>
                  <span style={{ background: "#e6f5ec", color: "#1a5c2e", fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", display: "inline-block", marginTop: "4px" }}>Identity Verified</span>
                </div>
              </div>
              {[["Rating", product.sellerRating + " / 5.0"], ["Total Sales", product.sellerSales + " completed"], ["Member Since", "2023"], ["Response Time", "Under 2 hours"], ["Phone / WhatsApp", product.sellerPhone]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: "0.83rem", color: "#6b7a6f" }}>{k}</span>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13" }}>{v}</span>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${product.sellerPhone.replace(/\D/g,"")}?text=Hi, I found your listing on ZedMarkets.`} target="_blank" rel="noreferrer"
              style={{ display: "block", width: "100%", padding: "0.9rem", background: "#25D366", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", textAlign: "center" }}>
              Message Seller on WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: "2rem 5rem 5rem", maxWidth: "1300px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.75rem", letterSpacing: "-0.3px" }}>More in {product.category}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
            {related.map(p => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden", background: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.09)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                <div style={{ height: "170px", overflow: "hidden" }}>
                  <img src={p.imgs[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "0.9rem 1rem" }}>
                  <div style={{ fontSize: "0.63rem", color: "#1a5c2e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>{p.category}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f1a13", marginBottom: "3px" }}>{p.name}</div>
                  <div style={{ color: "#1a5c2e", fontWeight: 800, fontSize: "0.95rem" }}>{p.display}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "3px" }}>{p.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}