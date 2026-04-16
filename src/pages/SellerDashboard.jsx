import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function SellerDashboard() {
  const { user, logout, removeListing } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState("overview")

  if (!user || user.role !== "seller") return (
    <div style={{ paddingTop: "2rem", textAlign: "center", minHeight: "60vh" }}>
      <h2 style={{ color: "#0f1a13", marginBottom: "1rem" }}>Seller account required</h2>
      <Link to="/login" style={{ color: "#1a5c2e", fontWeight: 600 }}>Sign in as a seller</Link>
    </div>
  )

  const listings = user.listings || []
  const sales = user.sales || []
  const totalRevenue = sales.reduce((s, sale) => s + (sale.amount || 0), 0)
  const totalViews = listings.reduce((s, l) => s + (l.views || 0), 0)
  const totalCartAdds = listings.reduce((s, l) => s + (l.cartAdds || 0), 0)

  const statusColor = { Active: "#1a5c2e", Pending: "#c47b2b", Sold: "#555", Inactive: "#e05050" }
  const orderStatusColor = { Delivered: "#1a5c2e", Processing: "#c47b2b", Cancelled: "#e05050" }
  const orderStatusBg = { Delivered: "#e6f5ec", Processing: "#fff8ed", Cancelled: "#fde8e8" }

  const tabs = ["overview", "listings", "orders", "analytics", "settings"]

  return (
    <div style={{ paddingTop: "0", minHeight: "100vh", background: "#f4f6f4", display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: "240px", background: "#0f1a13", minHeight: "calc(100vh - 64px)", padding: "2rem 0", flexShrink: 0, position: "sticky", top: "64px", alignSelf: "flex-start" }}>
        <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#1a5c2e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>{user.firstName[0]}</span>
          </div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{user.businessName || user.firstName}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginTop: "2px" }}>Seller Account</div>
          <span style={{ background: "#1a5c2e", color: "#a3d9b5", fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", display: "inline-block", marginTop: "6px" }}>Verified</span>
        </div>
        <div style={{ padding: "1rem 0" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              width: "100%", padding: "0.75rem 1.5rem", border: "none", background: tab === t ? "rgba(26,92,46,0.3)" : "transparent",
              color: tab === t ? "#a3d9b5" : "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontWeight: tab === t ? 600 : 400,
              cursor: "pointer", textAlign: "left", textTransform: "capitalize",
              borderLeft: tab === t ? "3px solid #1a5c2e" : "3px solid transparent"
            }}>{t}</button>
          ))}
        </div>
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "auto" }}>
          <Link to="/seller/add-listing" style={{ display: "block", background: "#c47b2b", color: "#fff", padding: "0.7rem 1rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600, textAlign: "center", marginBottom: "0.75rem" }}>
            + Add New Listing
          </Link>
          <button onClick={() => { logout(); navigate("/") }} style={{ width: "100%", background: "transparent", color: "rgba(255,255,255,0.35)", border: "none", fontSize: "0.78rem", cursor: "pointer", textAlign: "left", padding: "0.5rem 0" }}>
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "2.5rem" }}>

        {tab === "overview" && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#0f1a13", letterSpacing: "-0.5px" }}>
                Good day, {user.firstName}
              </h1>
              <p style={{ color: "#9aada0", fontSize: "0.85rem", marginTop: "4px" }}>Here is your seller overview</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "2.5rem" }}>
              {[
                { label: "Total Revenue", value: `K${totalRevenue.toLocaleString()}`, color: "#1a5c2e", bg: "#e6f5ec" },
                { label: "Active Listings", value: listings.filter(l => l.status === "Active").length, color: "#0f1a13", bg: "#fff" },
                { label: "Product Views", value: totalViews, color: "#0f1a13", bg: "#fff" },
                { label: "Cart Adds", value: totalCartAdds, color: "#c47b2b", bg: "#fff8ed" },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: "14px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{s.label}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13" }}>Recent Sales</h3>
                  <button onClick={() => setTab("orders")} style={{ background: "none", border: "none", color: "#1a5c2e", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}>View all</button>
                </div>
                {sales.length === 0 ? (
                  <p style={{ color: "#9aada0", fontSize: "0.83rem" }}>No sales yet. Add your first listing!</p>
                ) : sales.slice(0, 4).map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.7rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <div>
                      <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13" }}>{s.product}</div>
                      <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{s.buyer} &bull; {s.date}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a5c2e" }}>K{s.amount?.toLocaleString()}</div>
                      <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "2px 7px", borderRadius: "10px", background: orderStatusBg[s.status] || "#f0f0f0", color: orderStatusColor[s.status] || "#555" }}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13" }}>Your Listings</h3>
                  <Link to="/seller/add-listing" style={{ background: "#1a5c2e", color: "#fff", fontSize: "0.72rem", fontWeight: 600, padding: "4px 12px", borderRadius: "6px" }}>+ Add</Link>
                </div>
                {listings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <p style={{ color: "#9aada0", fontSize: "0.83rem", marginBottom: "1rem" }}>No listings yet</p>
                    <Link to="/seller/add-listing" style={{ background: "#1a5c2e", color: "#fff", padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600 }}>Add your first product</Link>
                  </div>
                ) : listings.slice(0, 4).map(l => (
                  <div key={l.id} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <img src={l.img} alt={l.name} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0f1a13" }}>{l.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "#9aada0" }}>{l.views} views &bull; {l.cartAdds} cart adds</div>
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", background: l.status === "Active" ? "#e6f5ec" : "#f0f0f0", color: statusColor[l.status] || "#555" }}>{l.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "listings" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13" }}>My Listings</h1>
              <Link to="/seller/add-listing" style={{ background: "#1a5c2e", color: "#fff", padding: "0.7rem 1.4rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600 }}>+ Add New Listing</Link>
            </div>
            {listings.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "4rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.75rem" }}>No listings yet</h3>
                <p style={{ color: "#9aada0", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Start by adding your first product. It takes less than 2 minutes.</p>
                <Link to="/seller/add-listing" style={{ background: "#1a5c2e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600 }}>Add your first listing</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {listings.map(l => (
                  <div key={l.id} style={{ background: "#fff", borderRadius: "14px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                    <img src={l.img || "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200&q=80"} alt={l.name} style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f1a13", marginBottom: "2px" }}>{l.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "#9aada0", marginBottom: "6px" }}>{l.category} &bull; Added {l.dateAdded}</div>
                      <div style={{ display: "flex", gap: "1.5rem" }}>
                        <span style={{ fontSize: "0.72rem", color: "#6b7a6f" }}>{l.views || 0} views</span>
                        <span style={{ fontSize: "0.72rem", color: "#6b7a6f" }}>{l.cartAdds || 0} cart adds</span>
                        <span style={{ fontSize: "0.72rem", color: "#6b7a6f" }}>{l.sales || 0} sold</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1a5c2e", marginBottom: "6px" }}>{l.display}</div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: "10px", background: l.status === "Active" ? "#e6f5ec" : "#f0f0f0", color: statusColor[l.status] || "#555" }}>{l.status}</span>
                    </div>
                    <button onClick={() => removeListing(l.id)} style={{ background: "none", border: "none", color: "#e05050", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, marginLeft: "8px" }}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "orders" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Sales Orders</h1>
            {sales.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "4rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.07)" }}>
                <p style={{ color: "#9aada0" }}>No sales orders yet. Keep listing products!</p>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "0.85rem 1.5rem", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#f9fafb" }}>
                  {["Order ID","Product","Buyer","Amount","Status"].map(h => (
                    <span key={h} style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9aada0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
                  ))}
                </div>
                {sales.map(s => (
                  <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(0,0,0,0.05)", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "#9aada0" }}>#{s.id}</span>
                    <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13" }}>{s.product}</span>
                    <span style={{ fontSize: "0.83rem", color: "#6b7a6f" }}>{s.buyer}</span>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a5c2e" }}>K{s.amount?.toLocaleString()}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: "10px", display: "inline-block", background: orderStatusBg[s.status] || "#f0f0f0", color: orderStatusColor[s.status] || "#555" }}>{s.status}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "analytics" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Analytics</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { label: "Total Revenue", value: `K${totalRevenue.toLocaleString()}`, desc: "All time earnings" },
                { label: "Total Views", value: totalViews, desc: "Across all listings" },
                { label: "Conversion Rate", value: totalViews > 0 ? ((sales.length / totalViews) * 100).toFixed(1) + "%" : "0%", desc: "Views to purchases" },
                { label: "Cart Add Rate", value: totalViews > 0 ? ((totalCartAdds / totalViews) * 100).toFixed(1) + "%" : "0%", desc: "Views to cart adds" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{s.label}</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1a5c2e", letterSpacing: "-1px", marginBottom: "4px" }}>{s.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9aada0" }}>{s.desc}</div>
                </div>
              ))}
            </div>
            {listings.length > 0 && (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)", marginTop: "20px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.25rem" }}>Performance by Listing</h3>
                {listings.map(l => (
                  <div key={l.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <img src={l.img} alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{l.name}</div>
                      <div style={{ display: "flex", gap: "2rem" }}>
                        {[["Views", l.views || 0], ["Cart Adds", l.cartAdds || 0], ["Sales", l.sales || 0]].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: "0.62rem", color: "#9aada0", textTransform: "uppercase", letterSpacing: "0.08em" }}>{k}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0f1a13" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#1a5c2e", fontSize: "0.95rem" }}>{l.display}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "settings" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Account Settings</h1>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", maxWidth: "560px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1a13", marginBottom: "1.5rem" }}>Business Profile</h3>
              {[["Business Name", user.businessName || "-"], ["Full Name", `${user.firstName} ${user.lastName}`], ["Email", user.email], ["Phone", user.phone], ["Province", user.province], ["Member Since", user.joinedDate], ["Categories", (user.categories || []).join(", ") || "-"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: "0.83rem", color: "#9aada0" }}>{k}</span>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1a13", maxWidth: "280px", textAlign: "right" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#e6f5ec", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a5c2e", marginBottom: "3px" }}>Identity Status</div>
                <div style={{ fontSize: "0.75rem", color: "#4a7a5a" }}>Your NRC/passport has been submitted. Verification is complete.</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}