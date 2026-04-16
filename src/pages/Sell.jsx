import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sell() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const steps = [
    { n: "01", title: "Create your account", desc: "Sign up with your phone number or email. Takes under 2 minutes. Choose Seller when registering." },
    { n: "02", title: "Verify your identity", desc: "Upload a clear photo of your NRC or passport. We verify within 24 hours and send you a confirmation." },
    { n: "03", title: "Get your blue badge", desc: "Once verified you receive a blue Verified Vendor badge on your profile and all your listings." },
    { n: "04", title: "List and start earning", desc: "Add photos, set your price, write a description. Your listing goes live immediately and buyers can reach you." },
  ]

  const plans = [
    { name: "Free", price: "K0", period: "forever", features: ["Up to 5 listings", "Standard visibility", "Buyer messaging", "Basic seller profile", "Blue verified badge"], cta: "Get started free", accent: false, to: "/register?role=seller" },
    { name: "Pro Seller", price: "K199", period: "per month", features: ["Unlimited listings", "Priority placement in search", "Featured badge on all listings", "Seller analytics dashboard", "Priority support", "Blue verified badge"], cta: "Start Pro trial", accent: true, to: "/register?role=seller" },
    { name: "Business", price: "K499", period: "per month", features: ["Everything in Pro", "Dedicated account manager", "Bulk listing upload", "Custom seller storefront", "Direct integration support"], cta: "Contact sales", accent: false, to: "/contact" },
  ]

  const trust = [
    { title: "Blue Verified Badge", desc: "All verified sellers get a blue badge visible on every listing and their seller profile." },
    { title: "Phone & WhatsApp", desc: "Your phone number is visible to buyers so they can contact you directly on WhatsApp." },
    { title: "On-Platform Transactions", desc: "All payments happen through ZedMarkets. Funds are held safely until delivery is confirmed." },
    { title: "Seller Protection", desc: "We protect sellers from fraudulent buyers. Disputes are handled by our Lusaka-based team." },
  ]

  return (
    <div style={{ paddingTop: "0" }}>

      <section style={{ background: "linear-gradient(160deg, #0a1209, #163520)", padding: "6rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, backgroundImage: "url('https://images.unsplash.com/photo-1559526324-593bc073d938?w=1400&q=80')", backgroundSize: "cover" }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", maxWidth: "1100px" }}>
          <div>
            <p style={{ color: "#f0a84e", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Sell on ZedMarkets</p>
            <h1 style={{ color: "#fff", fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "1.5rem" }}>Reach buyers across all of Zambia</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "2.5rem" }}>
              Over 1,200 verified sellers are already earning on ZedMarkets. Get your blue verified badge, list your products, and let buyers come to you. No commissions on the basic plan.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {user && user.role === "seller" ? (
                <Link to="/seller/dashboard" style={{ background: "#c47b2b", color: "#fff", padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 700 }}>
                  Go to My Dashboard
                </Link>
              ) : (
                <Link to="/register?role=seller" style={{ background: "#c47b2b", color: "#fff", padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 700 }}>
                  Start selling for free
                </Link>
              )}
              <Link to="/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "1rem 2rem", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.2)" }}>
                Sign in to existing account
              </Link>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#1a5c2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>T</span>
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  TechZed Lusaka
                  <span style={{ background: "#1d6ce6", color: "#fff", fontSize: "0.58rem", fontWeight: 800, padding: "2px 7px", borderRadius: "10px" }}>Verified</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Electronics &bull; Lusaka</div>
              </div>
            </div>
            {[["Revenue this month", "K18,400"], ["Active listings", "12"], ["Total sales", "312"], ["Profile views", "1,840"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>{k}</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: "1.25rem", background: "rgba(26,92,46,0.3)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
              <div style={{ color: "#a3d9b5", fontSize: "0.75rem", fontWeight: 600 }}>This is what your seller dashboard looks like after verification.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#1a5c2e", padding: "1rem 5rem", display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
        {["Free to list on basic plan", "Blue verified badge after ID check", "WhatsApp contact visible to buyers", "All payments processed on-platform"].map(t => (
          <span key={t} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f0a84e", display: "inline-block" }} />{t}
          </span>
        ))}
      </section>

      <section style={{ padding: "6rem 5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a5c2e", marginBottom: "0.75rem", textAlign: "center" }}>How it works</p>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f1a13", textAlign: "center", marginBottom: "4rem", letterSpacing: "-0.5px" }}>Get verified and start selling in 4 steps</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", position: "relative" }}>
              {i === 2 && (
                <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "#1d6ce6", color: "#fff", fontSize: "0.6rem", fontWeight: 800, padding: "3px 8px", borderRadius: "10px" }}>Blue Badge</div>
              )}
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#e8f5ec", lineHeight: 1, marginBottom: "1.25rem" }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f1a13", marginBottom: "0.6rem" }}>{s.title}</div>
              <p style={{ fontSize: "0.83rem", color: "#6b7a6f", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/register?role=seller" style={{ background: "#1a5c2e", color: "#fff", padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700 }}>
            Create your seller account
          </Link>
        </div>
      </section>

      <section style={{ padding: "6rem 5rem", background: "#f4f7f5" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a5c2e", marginBottom: "0.75rem", textAlign: "center" }}>Why sell here</p>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f1a13", textAlign: "center", marginBottom: "3rem", letterSpacing: "-0.5px" }}>Built to protect you and your buyers</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px", marginBottom: "4rem" }}>
          {trust.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ width: "44px", height: "44px", background: i === 0 ? "#e6f0ff" : "#e6f5ec", borderRadius: "12px", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "18px", height: "18px", background: i === 0 ? "#1d6ce6" : "#1a5c2e", borderRadius: "3px" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f1a13", marginBottom: "0.6rem" }}>{t.title}</div>
              <p style={{ fontSize: "0.83rem", color: "#6b7a6f", lineHeight: 1.75 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a5c2e", marginBottom: "0.75rem", textAlign: "center" }}>Pricing plans</p>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f1a13", textAlign: "center", marginBottom: "3rem", letterSpacing: "-0.5px" }}>Simple, transparent pricing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px", maxWidth: "900px", margin: "0 auto" }}>
          {plans.map(pl => (
            <div key={pl.name} style={{ background: pl.accent ? "#0f1a13" : "#fff", borderRadius: "14px", padding: "2.5rem", border: pl.accent ? "none" : "1px solid rgba(0,0,0,0.07)", position: "relative" }}>
              {pl.accent && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#c47b2b", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "4px 14px", borderRadius: "20px", whiteSpace: "nowrap" }}>Most Popular</div>}
              <div style={{ color: pl.accent ? "rgba(255,255,255,0.5)" : "#6b7a6f", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>{pl.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "0.5rem" }}>
                <span style={{ color: pl.accent ? "#fff" : "#0f1a13", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1px" }}>{pl.price}</span>
                <span style={{ color: pl.accent ? "rgba(255,255,255,0.4)" : "#9aada0", fontSize: "0.8rem" }}>{pl.period}</span>
              </div>
              <div style={{ borderTop: "1px solid", borderColor: pl.accent ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)", paddingTop: "1.5rem", marginTop: "1.5rem", marginBottom: "2rem" }}>
                {pl.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: pl.accent ? "#f0a84e" : "#1a5c2e", flexShrink: 0 }} />
                    <span style={{ color: pl.accent ? "rgba(255,255,255,0.7)" : "#555", fontSize: "0.83rem" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={pl.to} style={{ display: "block", width: "100%", padding: "0.85rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", textAlign: "center", boxSizing: "border-box", background: pl.accent ? "#c47b2b" : "transparent", color: pl.accent ? "#fff" : "#1a5c2e", border: pl.accent ? "none" : "1.5px solid #1a5c2e" }}>
                {pl.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}