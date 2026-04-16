import { Link } from "react-router-dom"

const categoryLinks = ["Electronics","Clothing","Food & Agri","Property","Vehicles","Services","Health & Beauty","Sports","Books & Education"]

export default function Footer() {
  return (
    <footer style={{ background: "#0f1a13", color: "rgba(255,255,255,0.55)", padding: "5rem 5rem 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1.2fr 1fr 1fr", gap: "3rem", marginBottom: "3.5rem" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1rem" }}>
            Zed<span style={{ color: "#f0a84e" }}>Markets</span>
          </div>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.85, maxWidth: "280px", marginBottom: "1.5rem" }}>
            Zambia's most trusted online marketplace. Connecting verified sellers with confident buyers across all 9 provinces.
          </p>
          <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
            <span style={{ background: "#1a5c2e", color: "#a3d9b5", fontSize: "0.65rem", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>Made in Zambia</span>
            <span style={{ background: "#5c2e00", color: "#f0c080", fontSize: "0.65rem", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>Scam-Free Zone</span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
            <div>Cairo Road, Lusaka, Zambia</div>
            <div>+260 97 123 4567</div>
            <div>hello@zedmarkets.zm</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Marketplace</div>
          {[["Browse All Products", "/listings"], ["Sell on ZedMarkets", "/sell"], ["How It Works", "/about"], ["Pricing Plans", "/sell"], ["Become a Seller", "/register?role=seller"], ["Login to Account", "/login"]].map(([l, to]) => (
            <div key={l} style={{ marginBottom: "0.65rem" }}>
              <Link to={to} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Categories</div>
          {categoryLinks.map(c => (
            <div key={c} style={{ marginBottom: "0.65rem" }}>
              <Link to={`/listings?category=${encodeURIComponent(c)}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{c}</Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Company</div>
          {[["About ZedMarkets", "/about"], ["Our Mission", "/about"], ["Meet the Team", "/about"], ["Careers", "/contact"], ["Press & Media", "/contact"], ["Partnerships", "/contact"]].map(([l, to]) => (
            <div key={l} style={{ marginBottom: "0.65rem" }}>
              <Link to={to} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</Link>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Support</div>
          {[["Help Centre", "/contact"], ["Contact Us", "/contact"], ["Report a Scam", "/contact"], ["Dispute Resolution", "/contact"], ["Seller Guidelines", "/about"], ["Buyer Protection", "/about"], ["Privacy Policy", "/about"], ["Terms of Use", "/about"]].map(([l, to]) => (
            <div key={l} style={{ marginBottom: "0.65rem" }}>
              <Link to={to} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem", marginBottom: "4px" }}>Stay updated with new listings</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Get notified when new products are listed in your area</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input type="email" placeholder="Your email address" style={{ padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "0.83rem", outline: "none", width: "220px" }} />
          <button style={{ background: "#c47b2b", color: "#fff", border: "none", padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer" }}>Subscribe</button>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>2025 ZedMarkets Ltd. All rights reserved. Proudly Zambian.</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Airtel Money", "MTN MoMo", "Visa", "Zanaco"].map(p => (
            <span key={p} style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: "0.62rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}