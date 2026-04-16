import { useParams, Link, useNavigate } from "react-router-dom"
import { products } from "../data/products"

const DEMO_SELLERS = {
  "techzed-lusaka": {
    id: "techzed-lusaka", name: "TechZed Lusaka", initials: "T", color: "#1a5c2e",
    verified: true, rating: 4.8, sales: 312, joinedDate: "January 2023",
    province: "Lusaka", phone: "+260971234567",
    description: "Your trusted electronics shop on Cairo Road, Lusaka. We sell brand new and quality used phones, laptops, tablets and accessories. All products come with receipts. Walk-in welcome.",
    categories: ["Electronics"],
    responseTime: "Under 1 hour",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
  },
  "mama-grace-designs": {
    id: "mama-grace-designs", name: "Mama Grace Designs", initials: "M", color: "#c47b2b",
    verified: true, rating: 4.9, sales: 87, joinedDate: "March 2022",
    province: "Ndola", phone: "+260961234567",
    description: "Handmade chitenge fashion from the heart of Ndola. Every dress is tailored to your measurements. I also do custom orders for weddings, graduations and church events.",
    categories: ["Clothing"],
    responseTime: "Under 2 hours",
    img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80"
  },
  "choma-farms": {
    id: "choma-farms", name: "Choma Farms", initials: "C", color: "#2d8a4e",
    verified: true, rating: 4.7, sales: 540, joinedDate: "August 2021",
    province: "Choma", phone: "+260951234567",
    description: "Certified Grade A maize and fresh produce direct from our farm in Choma. We supply individuals, restaurants, schools and NGOs. Bulk orders welcome with special pricing.",
    categories: ["Food & Agri"],
    responseTime: "Under 3 hours",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
  },
}

export default function SellerProfile() {
  const { sellerId } = useParams()
  const navigate = useNavigate()
  const seller = DEMO_SELLERS[sellerId] || {
    id: sellerId, name: sellerId?.replace(/-/g, " "), initials: sellerId?.[0]?.toUpperCase() || "S",
    color: "#1a5c2e", verified: true, rating: 4.5, sales: 42, joinedDate: "2024",
    province: "Lusaka", phone: "+260970000000",
    description: "Verified seller on ZedMarkets.", categories: [], responseTime: "Under 24 hours",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
  }

  const sellerProducts = products.filter(p =>
    p.seller.toLowerCase().replace(/\s+/g, "-") === sellerId ||
    seller.categories.some(c => p.category === c)
  ).slice(0, 8)

  const Stars = ({ rating }) => (
    <span>{Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? "#f0a84e" : "#ddd", fontSize: "14px" }}>
        {i < Math.floor(rating) ? "\u2605" : "\u2606"}
      </span>
    ))}</span>
  )

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <div style={{ background: "#0f1a13", padding: "3rem 5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", maxWidth: "900px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: seller.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "3px solid rgba(255,255,255,0.15)" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.8rem" }}>{seller.initials}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.5px" }}>{seller.name}</h1>
              {seller.verified && (
                <span style={{ background: "#1d6ce6", color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "3px 10px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified Vendor
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Stars rating={seller.rating} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>{seller.rating} ({seller.sales} sales)</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{seller.province}, Zambia</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>Member since {seller.joinedDate}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
            <a href={`https://wa.me/${seller.phone.replace(/\D/g,"")}?text=Hi ${seller.name}, I found your profile on ZedMarkets.`}
              target="_blank" rel="noreferrer"
              style={{ background: "#25D366", color: "#fff", padding: "0.65rem 1.25rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600 }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div style={{ padding: "3rem 5rem", display: "grid", gridTemplateColumns: "300px 1fr", gap: "3rem", maxWidth: "1300px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.25rem" }}>Seller Info</h3>
            {[
              ["Rating", `${seller.rating} / 5.0`],
              ["Total Sales", `${seller.sales} completed`],
              ["Response Time", seller.responseTime],
              ["Province", seller.province],
              ["Member Since", seller.joinedDate],
              ["Categories", seller.categories.join(", ") || "Multiple"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: "0.8rem", color: "#9aada0" }}>{k}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f1a13", textAlign: "right", maxWidth: "160px" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1rem" }}>About</h3>
            <p style={{ fontSize: "0.83rem", color: "#6b7a6f", lineHeight: 1.8 }}>{seller.description}</p>
          </div>

          {seller.verified && (
            <div style={{ background: "#e6f0ff", borderRadius: "14px", padding: "1.25rem", border: "1px solid #b3d0ff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ background: "#1d6ce6", color: "#fff", fontSize: "0.6rem", fontWeight: 800, padding: "2px 7px", borderRadius: "8px" }}>Verified</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1d4ca0" }}>Identity Confirmed</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#3a5a90", lineHeight: 1.6 }}>This seller's NRC/passport has been verified by ZedMarkets. You can buy with confidence.</p>
            </div>
          )}

          <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1rem" }}>Contact Seller</h3>
            <a href={`https://wa.me/${seller.phone.replace(/\D/g,"")}?text=Hi ${seller.name}, I found your profile on ZedMarkets and I would like to enquire about your products.`}
              target="_blank" rel="noreferrer"
              style={{ display: "block", background: "#25D366", color: "#fff", padding: "0.75rem", borderRadius: "10px", fontSize: "0.85rem", fontWeight: 600, textAlign: "center", marginBottom: "8px" }}>
              Chat on WhatsApp
            </a>
            <div style={{ fontSize: "0.75rem", color: "#9aada0", textAlign: "center" }}>
              Responds {seller.responseTime.toLowerCase()}
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f1a13" }}>
              Products by {seller.name}
            </h2>
            <Link to={`/listings?seller=${encodeURIComponent(seller.name)}`} style={{ color: "#1a5c2e", fontSize: "0.83rem", fontWeight: 600, border: "1.5px solid #1a5c2e", padding: "0.4rem 1rem", borderRadius: "8px" }}>
              View all
            </Link>
          </div>

          {sellerProducts.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: "14px", padding: "3rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ color: "#9aada0" }}>No products listed yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
              {sellerProducts.map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden", background: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.09)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img src={p.imgs[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "0.9rem 1rem" }}>
                    <div style={{ fontSize: "0.63rem", color: "#1a5c2e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>{p.category}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.83rem", color: "#0f1a13", marginBottom: "3px" }}>{p.name}</div>
                    <div style={{ color: "#1a5c2e", fontWeight: 800, fontSize: "0.95rem" }}>{p.display}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}