import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div style={{ paddingTop: "0", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "#fafaf8" }}>
      <div style={{ width: "80px", height: "80px", background: "#e6f5ec", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13" }}>Your cart is empty</h2>
      <p style={{ color: "#6b7a6f", fontSize: "0.9rem" }}>Browse listings and add something you like.</p>
      <Link to="/listings" style={{ background: "#1a5c2e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem" }}>Browse Products</Link>
    </div>
  )

  return (
    <div style={{ paddingTop: "0", background: "#fafaf8", minHeight: "100vh" }}>
      <div style={{ background: "#0f1a13", padding: "2.5rem 5rem" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.5px" }}>Your Cart</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>{cart.length} item{cart.length !== 1 ? "s" : ""} ready for checkout</p>
      </div>

      <div style={{ padding: "3rem 5rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {cart.map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "14px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div onClick={() => navigate(`/product/${item.id}`)} style={{ width: "96px", height: "96px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
                  <img src={item.imgs[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div onClick={() => navigate(`/product/${item.id}`)} style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f1a13", marginBottom: "3px", cursor: "pointer" }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9aada0", marginBottom: "10px" }}>{item.seller} &middot; {item.location}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "8px", overflow: "hidden" }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: "5px 12px", border: "none", background: "#fff", cursor: "pointer", fontSize: "1rem", color: "#0f1a13" }}>-</button>
                      <span style={{ padding: "5px 14px", borderLeft: "1px solid rgba(0,0,0,0.08)", borderRight: "1px solid rgba(0,0,0,0.08)", fontSize: "0.85rem", fontWeight: 600 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: "5px 12px", border: "none", background: "#fff", cursor: "pointer", fontSize: "1rem", color: "#0f1a13" }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#e05050", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}>Remove</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#1a5c2e" }}>K{(item.price * item.qty).toLocaleString()}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "3px" }}>K{item.price.toLocaleString()} each</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={clearCart} style={{ marginTop: "1.25rem", background: "none", border: "none", color: "#e05050", fontSize: "0.83rem", cursor: "pointer", fontWeight: 600 }}>Clear entire cart</button>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", position: "sticky", top: "84px" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f1a13", marginBottom: "1.5rem" }}>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.65rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#6b7a6f", maxWidth: "200px", lineHeight: 1.4 }}>{item.name} x{item.qty}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f1a13", flexShrink: 0 }}>K{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "1rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.83rem", color: "#6b7a6f" }}>Subtotal</span>
              <span style={{ fontSize: "0.83rem", fontWeight: 600 }}>K{total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.83rem", color: "#6b7a6f" }}>Delivery</span>
              <span style={{ fontSize: "0.83rem", color: "#1a5c2e", fontWeight: 600 }}>Arranged with seller</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0f1a13" }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: "1.4rem", color: "#1a5c2e", letterSpacing: "-0.5px" }}>K{total.toLocaleString()}</span>
            </div>
          </div>
          <button style={{ width: "100%", background: "#1a5c2e", color: "#fff", border: "none", padding: "1rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", marginBottom: "10px" }}>
            Proceed to Checkout
          </button>
          <Link to="/listings" style={{ display: "block", textAlign: "center", color: "#1a5c2e", fontSize: "0.83rem", fontWeight: 500, marginTop: "0.75rem" }}>Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}