import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function BuyerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState("overview")

  if (!user || user.role !== "buyer") return (
    <div style={{ paddingTop: "2rem", textAlign: "center", minHeight: "60vh" }}>
      <h2 style={{ color: "#0f1a13", marginBottom: "1rem" }}>Buyer account required</h2>
      <Link to="/login" style={{ color: "#1a5c2e", fontWeight: 600 }}>Sign in</Link>
    </div>
  )

  const orders = user.orders || []
  const statusColor = { Delivered: "#1a5c2e", Processing: "#c47b2b", Cancelled: "#e05050", Shipped: "#1a5c2e" }
  const statusBg = { Delivered: "#e6f5ec", Processing: "#fff8ed", Cancelled: "#fde8e8", Shipped: "#e6f5ec" }
  const tabs = ["overview", "orders", "saved", "settings"]

  return (
    <div style={{ paddingTop: "0", minHeight: "100vh", background: "#f4f6f4", display: "flex" }}>

      <div style={{ width: "230px", background: "#0f1a13", minHeight: "calc(100vh - 64px)", padding: "2rem 0", flexShrink: 0, position: "sticky", top: "64px", alignSelf: "flex-start" }}>
        <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#c47b2b", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>{user.firstName[0]}</span>
          </div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{user.firstName} {user.lastName}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginTop: "2px" }}>{user.province}, Zambia</div>
        </div>
        <div style={{ padding: "1rem 0" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              width: "100%", padding: "0.75rem 1.5rem", border: "none",
              background: tab === t ? "rgba(196,123,43,0.2)" : "transparent",
              color: tab === t ? "#f0c080" : "rgba(255,255,255,0.5)",
              fontSize: "0.85rem", fontWeight: tab === t ? 600 : 400,
              cursor: "pointer", textAlign: "left", textTransform: "capitalize",
              borderLeft: tab === t ? "3px solid #c47b2b" : "3px solid transparent"
            }}>{t}</button>
          ))}
        </div>
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link to="/listings" style={{ display: "block", background: "#c47b2b", color: "#fff", padding: "0.7rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600, textAlign: "center", marginBottom: "0.75rem" }}>
            Browse Products
          </Link>
          <button onClick={() => { logout(); navigate("/") }} style={{ width: "100%", background: "transparent", color: "rgba(255,255,255,0.35)", border: "none", fontSize: "0.78rem", cursor: "pointer", textAlign: "left", padding: "0.5rem 0" }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "2.5rem" }}>
        {tab === "overview" && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#0f1a13", letterSpacing: "-0.5px" }}>
                Welcome back, {user.firstName}
              </h1>
              <p style={{ color: "#9aada0", fontSize: "0.85rem", marginTop: "4px" }}>Your shopping overview</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "2.5rem" }}>
              {[
                { label: "Total Orders", value: orders.length, bg: "#fff" },
                { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length, bg: "#e6f5ec" },
                { label: "Processing", value: orders.filter(o => o.status === "Processing").length, bg: "#fff8ed" },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: "14px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{s.label}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0f1a13" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13" }}>Recent Orders</h3>
                <button onClick={() => setTab("orders")} style={{ background: "none", border: "none", color: "#1a5c2e", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}>View all</button>
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <p style={{ color: "#9aada0", fontSize: "0.83rem", marginBottom: "1rem" }}>No orders yet. Start shopping!</p>
                  <Link to="/listings" style={{ background: "#1a5c2e", color: "#fff", padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600 }}>Browse products</Link>
                </div>
              ) : orders.slice(0, 3).map(o => (
                <div key={o.id} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <img src={o.img} alt={o.product} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f1a13" }}>{o.product}</div>
                    <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{o.seller} &bull; {o.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#1a5c2e", fontSize: "0.88rem" }}>K{o.amount?.toLocaleString()}</div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", background: statusBg[o.status] || "#f0f0f0", color: statusColor[o.status] || "#555" }}>{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "orders" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>My Orders</h1>
            {orders.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "4rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
                <p style={{ color: "#9aada0", marginBottom: "1.5rem" }}>You have not placed any orders yet.</p>
                <Link to="/listings" style={{ background: "#1a5c2e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600 }}>Start shopping</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {orders.map(o => (
                  <div key={o.id} style={{ background: "#fff", borderRadius: "14px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                    <img src={o.img} alt={o.product} style={{ width: "72px", height: "72px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f1a13", marginBottom: "3px" }}>{o.product}</div>
                      <div style={{ fontSize: "0.75rem", color: "#9aada0", marginBottom: "6px" }}>Sold by {o.seller} &bull; Order #{o.id}</div>
                      <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>Placed on {o.date}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1a5c2e", marginBottom: "6px" }}>K{o.amount?.toLocaleString()}</div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: "10px", background: statusBg[o.status] || "#f0f0f0", color: statusColor[o.status] || "#555" }}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "saved" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Saved Items</h1>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "4rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ color: "#9aada0", marginBottom: "1.5rem" }}>No saved items yet. Browse listings and save products you like.</p>
              <Link to="/listings" style={{ background: "#1a5c2e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600 }}>Browse products</Link>
            </div>
          </>
        )}

        {tab === "settings" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Account Settings</h1>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", maxWidth: "520px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.5rem" }}>Personal Details</h3>
              {[["Full Name", `${user.firstName} ${user.lastName}`], ["Email", user.email], ["Phone", user.phone], ["Province", user.province], ["Town", user.town || "-"], ["Delivery Address", user.address || "-"], ["Member Since", user.joinedDate], ["Preferred Categories", (user.categories || []).join(", ") || "Not set"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: "0.83rem", color: "#9aada0" }}>{k}</span>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13", maxWidth: "260px", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}