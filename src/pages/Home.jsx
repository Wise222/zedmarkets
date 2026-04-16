import { Link, useNavigate } from "react-router-dom"
import { products } from "../data/products"

const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&q=80" },
  { name: "Clothing", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80" },
  { name: "Food & Agri", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80" },
  { name: "Property", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" },
  { name: "Services", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80" },
  { name: "Vehicles", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80" },
]

const trust = [
  { title: "Identity Verified", desc: "Every seller submits a valid NRC or passport before listing anything." },
  { title: "Buyer Ratings", desc: "Real reviews from real buyers on every seller profile after each transaction." },
  { title: "Report Instantly", desc: "Flag any suspicious listing in one tap. Our team reviews within 24 hours." },
  { title: "Zambian Support", desc: "Our support team is based in Lusaka. Call, WhatsApp or email us anytime." },
]

export default function Home() {
  const navigate = useNavigate()
  const featured = products.slice(0, 8)

  return (
    <div>
      <section style={{
        minHeight: "92vh",
        background: "linear-gradient(160deg,#0a1209 0%,#0f1f10 40%,#163520 100%)",
        display: "flex", alignItems: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2,
          backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "5rem 5rem", maxWidth: "680px" }}>
          <div style={{ display: "inline-block", background: "rgba(240,168,78,0.15)", color: "#f0a84e",
            fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "6px 14px", borderRadius: "20px", marginBottom: "2rem",
            border: "1px solid rgba(240,168,78,0.3)" }}>
            Zambia's Trusted Marketplace
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 800,
            lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-1px" }}>
            Buy Smart.<br />
            Sell <span style={{ color: "#f0a84e" }}>Confidently.</span><br />
            Trust Zambia.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.85,
            marginBottom: "2.5rem", maxWidth: "460px" }}>
            ZedMarkets connects verified Zambian sellers with buyers across all 9 provinces.
            Every seller is identity-checked before their first listing goes live.
          </p>
          <div style={{ display: "flex", maxWidth: "540px", borderRadius: "12px",
            overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
            <input type="text" placeholder="Search phones, clothing, food, property..."
              style={{ flex: 1, padding: "1rem 1.4rem", border: "none", fontSize: "0.9rem",
                background: "#fff", outline: "none", color: "#0f1a13" }}
              onKeyDown={e => e.key === "Enter" && navigate(`/listings?search=${e.target.value}`)} />
            <button onClick={() => navigate("/listings")}
              style={{ background: "#c47b2b", color: "#fff", border: "none",
                padding: "1rem 1.6rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
              Search
            </button>
          </div>
          <div style={{ marginTop: "3.5rem", display: "flex", gap: "3.5rem", flexWrap: "wrap" }}>
            {[["1,240+","Verified sellers"],["8,500+","Active listings"],["Zero","Tolerance for scams"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px" }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginTop: "3px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "5rem 3rem 3rem 2rem" }}>
          {[
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
            "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=400&q=80",
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
          ].map((src, i) => (
            <div key={i} style={{ borderRadius: "12px", overflow: "hidden", height: "180px", opacity: 0.82 }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#1a5c2e", padding: "0.9rem 5rem",
        display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
        {["All sellers identity verified","Real buyer ratings","Report listings instantly","Lusaka-based support"].map(t => (
          <span key={t} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%",
              background: "#f0a84e", display: "inline-block", flexShrink: 0 }} />{t}
          </span>
        ))}
      </section>

      <section style={{ padding: "6rem 5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#1a5c2e", marginBottom: "0.75rem" }}>Shop by category</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f1a13", letterSpacing: "-0.5px" }}>
            What are you looking for?
          </h2>
          <Link to="/listings" style={{ color: "#1a5c2e", fontSize: "0.85rem", fontWeight: 500,
            border: "1.5px solid #1a5c2e", padding: "0.5rem 1.2rem", borderRadius: "8px" }}>
            View all listings
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: "16px" }}>
          {categories.map(cat => (
            <Link to={`/listings?category=${encodeURIComponent(cat.name)}`} key={cat.name}
              style={{ borderRadius: "14px", overflow: "hidden", textDecoration: "none",
                position: "relative", height: "180px", display: "block" }}>
              <img src={cat.img} alt={cat.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0,
                background: "linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 60%)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1rem" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 5rem 6rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#1a5c2e", marginBottom: "0.75rem" }}>Fresh listings</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f1a13", letterSpacing: "-0.5px" }}>
            Recently added products
          </h2>
          <Link to="/listings" style={{ color: "#1a5c2e", fontSize: "0.85rem", fontWeight: 500,
            border: "1.5px solid #1a5c2e", padding: "0.5rem 1.2rem", borderRadius: "8px" }}>
            View all
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "20px" }}>
          {featured.map(p => (
            <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}
              style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden",
                background: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none" }}>
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img src={p.imgs[0]} alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1rem 1.1rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#0f1a13", marginBottom: "4px" }}>
                  {p.name}
                </div>
                <div style={{ color: "#1a5c2e", fontWeight: 800, fontSize: "1.05rem", marginBottom: "8px" }}>
                  {p.display}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ background: "#e6f5ec", color: "#1a5c2e", padding: "2px 8px",
                    borderRadius: "10px", fontSize: "0.63rem", fontWeight: 600 }}>Verified</span>
                  <span style={{ fontSize: "0.72rem", color: "#6b7a6f" }}>{p.seller}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "4px" }}>{p.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 5rem", background: "#f4f7f5" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#1a5c2e", marginBottom: "0.75rem", textAlign: "center" }}>Why ZedMarkets</p>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f1a13", textAlign: "center",
          marginBottom: "3.5rem", letterSpacing: "-0.5px" }}>
          Built on trust. Backed by Zambians.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "20px" }}>
          {trust.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "2rem",
              border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ width: "44px", height: "44px", background: "#e6f5ec", borderRadius: "12px",
                marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "18px", height: "18px", background: "#1a5c2e", borderRadius: "3px" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f1a13", marginBottom: "0.6rem" }}>
                {t.title}
              </div>
              <p style={{ fontSize: "0.83rem", color: "#6b7a6f", lineHeight: 1.75 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "7rem 5rem", textAlign: "center",
        background: "linear-gradient(135deg,#0a1209 0%,#163520 100%)",
        position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1,
          backgroundImage: "url('https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#f0a84e", marginBottom: "1rem" }}>Start today</p>
          <h2 style={{ color: "#fff", fontSize: "2.8rem", fontWeight: 800, marginBottom: "1.25rem",
            letterSpacing: "-0.5px" }}>
            Ready to sell to <span style={{ color: "#f0a84e" }}>all of Zambia?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "460px",
            margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Join over 1,200 verified sellers already reaching buyers across every province.
            Registration is free and takes under 5 minutes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register?role=seller" style={{ background: "#c47b2b", color: "#fff",
              padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600 }}>
              Start selling for free
            </Link>
            <Link to="/listings" style={{ background: "rgba(255,255,255,0.08)", color: "#fff",
              padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.15)" }}>
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}