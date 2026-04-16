import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import PaymentGateway from "../components/PaymentGateway"

const carriers = [
  { id: "dhl", name: "DHL Express", price: 450, days: "1-2 business days", note: "International standard, fully tracked" },
  { id: "platinum", name: "Platinum Couriers", price: 180, days: "Same / next day", note: "Trusted nationwide Zambia courier" },
  { id: "mercury", name: "Mercury Couriers", price: 150, days: "1-3 business days", note: "Reliable nationwide delivery" },
  { id: "zampost", name: "Zambia Post", price: 60, days: "5-8 business days", note: "Most affordable nationwide option" },
  { id: "bus", name: "Bus Parcel Service", price: 40, days: "2-4 business days", note: "Intercity bus parcel network" },
  { id: "pickup", name: "Self Pickup", price: 0, days: "Same day", note: "Collect directly from seller" },
]

const provinces = ["Lusaka","Copperbelt","Central","Eastern","Western","Northern","Luapula","North-Western","Southern","Muchinga"]

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { user, addOrder } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [carrier, setCarrier] = useState("platinum")
  const [placed, setPlaced] = useState(false)
  const [paidWith, setPaidWith] = useState(null)
  const [form, setForm] = useState({
    firstName: user?.firstName || "", lastName: user?.lastName || "",
    phone: user?.phone || "", email: user?.email || "",
    address: user?.address || "", province: user?.province || "", town: user?.town || "",
    notes: ""
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const selectedCarrier = carriers.find(c => c.id === carrier)
  const deliveryCost = selectedCarrier?.price || 0
  const grandTotal = total + deliveryCost

  if (cart.length === 0 && !placed) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
      <h2 style={{ color: "#0f1a13" }}>Your cart is empty</h2>
      <Link to="/listings" style={{ color: "#1a5c2e", fontWeight: 600 }}>Continue shopping</Link>
    </div>
  )

  const handlePaymentSuccess = ({ method }) => {
    cart.forEach(item => {
      if (addOrder) addOrder({
        product: item.name, seller: item.seller,
        amount: item.price * item.qty, img: item.imgs?.[0],
        carrier: selectedCarrier?.name, payment: method
      })
    })
    clearCart()
    setPaidWith(method)
    setPlaced(true)
  }

  if (placed) return (
    <div style={{ minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "500px", padding: "2rem" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e6f5ec", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1rem" }}>Order Placed!</h1>
        <p style={{ color: "#6b7a6f", lineHeight: 1.8, marginBottom: "0.75rem" }}>
          Your order has been confirmed and payment processed via <strong>{paidWith}</strong>.
        </p>
        <p style={{ color: "#6b7a6f", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Delivery: <strong>{selectedCarrier?.name}</strong> &bull; {selectedCarrier?.days}
        </p>
        <p style={{ color: "#6b7a6f", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
          Confirmation sent to <strong>{form.phone}</strong>
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {user && <Link to={user.role === "buyer" ? "/buyer/dashboard" : "/"} style={{ background: "#1a5c2e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem" }}>View Orders</Link>}
          <Link to="/listings" style={{ background: "transparent", color: "#1a5c2e", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", border: "1.5px solid #1a5c2e" }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <div style={{ background: "#0f1a13", padding: "2rem 5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800 }}>Checkout</h1>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Delivery", "Shipping", "Payment", "Review"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700,
                background: step > i + 1 ? "#1a5c2e" : step === i + 1 ? "#f0a84e" : "rgba(255,255,255,0.15)", color: "#fff" }}>
                {step > i + 1 ? "\u2713" : i + 1}
              </div>
              <span style={{ color: step === i + 1 ? "#fff" : "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "3rem 5rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>
        <div>

          {step === 1 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.75rem" }}>Delivery Address</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                {[["firstName","First Name","text","Chanda"],["lastName","Last Name","text","Mwamba"]].map(([k,l,t,p]) => (
                  <div key={k} style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{l}</label>
                    <input type={t} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)}
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              {[["phone","Phone / WhatsApp","tel","+260 97 123 4567"],["email","Email Address","email","you@example.com"],["address","Street Address","text","Plot 1234, Cairo Road"]].map(([k,l,t,p]) => (
                <div key={k} style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{l}</label>
                  <input type={t} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Province</label>
                  <select value={form.province} onChange={e => set("province", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", background: "#fff", boxSizing: "border-box" }}>
                    <option value="">Select province</option>
                    {provinces.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Town / City</label>
                  <input type="text" placeholder="Lusaka" value={form.town} onChange={e => set("town", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Order Notes (optional)</label>
                <textarea rows={2} placeholder="Any special instructions..." value={form.notes} onChange={e => set("notes", e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => setStep(2)} style={{ width: "100%", padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
                Continue to Shipping
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.5rem" }}>Choose Shipping Carrier</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.75rem" }}>
                {carriers.map(c => (
                  <div key={c.id} onClick={() => setCarrier(c.id)} style={{
                    padding: "1rem 1.25rem", borderRadius: "12px", cursor: "pointer",
                    border: carrier === c.id ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.1)",
                    background: carrier === c.id ? "#e6f5ec" : "#fff",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: carrier === c.id ? "#1a5c2e" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: carrier === c.id ? "#fff" : "#555", fontSize: "0.6rem", fontWeight: 800 }}>{c.name.substring(0,3).toUpperCase()}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f1a13" }}>{c.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "#9aada0" }}>{c.days} &bull; {c.note}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: c.price === 0 ? "#1a5c2e" : "#0f1a13", flexShrink: 0 }}>
                      {c.price === 0 ? "Free" : `K${c.price}`}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", background: "transparent", color: "#1a5c2e", border: "1.5px solid #1a5c2e", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.5rem" }}>Payment</h2>
              <PaymentGateway
                amount={grandTotal}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setStep(2)}
              />
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "1.75rem", border: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: "108px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.25rem" }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: "10px", marginBottom: "0.85rem", alignItems: "center" }}>
              <img src={item.imgs?.[0]} alt="" style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f1a13", lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: "0.7rem", color: "#9aada0" }}>x{item.qty}</div>
              </div>
              <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#1a5c2e" }}>K{(item.price * item.qty).toLocaleString()}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "1rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#9aada0" }}>Subtotal</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>K{total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#9aada0" }}>Delivery</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: deliveryCost === 0 ? "#1a5c2e" : "#0f1a13" }}>{deliveryCost === 0 ? "Free" : `K${deliveryCost}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 800, color: "#0f1a13" }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: "1.2rem", color: "#1a5c2e" }}>K{grandTotal.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ marginTop: "1.25rem", padding: "0.85rem", background: "#f9fafb", borderRadius: "8px", fontSize: "0.72rem", color: "#9aada0", lineHeight: 1.6 }}>
            Delivery via {selectedCarrier?.name} &bull; {selectedCarrier?.days}
          </div>
        </div>
      </div>
    </div>
  )
}