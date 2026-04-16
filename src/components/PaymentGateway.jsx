import { useState } from "react"

const METHODS = [
  {
    id: "airtel",
    name: "Airtel Money",
    short: "Airtel Money",
    color: "#e03a3a",
    bg: "#fff0f0",
    border: "#e03a3a",
    logo: "AM",
    desc: "Pay instantly from your Airtel Money wallet",
    fields: [{ key: "phone", label: "Airtel Money Number", placeholder: "+260 97 123 4567", type: "tel" }],
    instruction: "You will receive a push notification on your phone to confirm payment.",
    fee: 0,
  },
  {
    id: "mtn",
    name: "MTN Mobile Money",
    short: "MTN MoMo",
    color: "#f5a623",
    bg: "#fffbf0",
    border: "#f5a623",
    logo: "MTN",
    desc: "Pay from your MTN MoMo wallet",
    fields: [{ key: "phone", label: "MTN MoMo Number", placeholder: "+260 96 123 4567", type: "tel" }],
    instruction: "Approve the payment prompt on your MTN MoMo app.",
    fee: 0,
  },
  {
    id: "zamtel",
    name: "Zamtel Kwacha",
    short: "Zamtel",
    color: "#2d7dd2",
    bg: "#f0f6ff",
    border: "#2d7dd2",
    logo: "ZK",
    desc: "Pay with your Zamtel Kwacha account",
    fields: [{ key: "phone", label: "Zamtel Number", placeholder: "+260 95 123 4567", type: "tel" }],
    instruction: "A USSD prompt will be sent to confirm your payment.",
    fee: 0,
  },
  {
    id: "visa",
    name: "Visa / Mastercard",
    short: "Card",
    color: "#1a5c2e",
    bg: "#f0f9f4",
    border: "#1a5c2e",
    logo: "CARD",
    desc: "Pay securely with any debit or credit card",
    fields: [
      { key: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", type: "text" },
      { key: "cardName", label: "Name on Card", placeholder: "CHANDA MWAMBA", type: "text" },
      { key: "expiry", label: "Expiry Date", placeholder: "MM/YY", type: "text" },
      { key: "cvv", label: "CVV", placeholder: "123", type: "password" },
    ],
    instruction: "Your card details are encrypted with 256-bit SSL.",
    fee: 25,
  },
  {
    id: "zanaco",
    name: "Zanaco Bank Transfer",
    short: "Zanaco",
    color: "#003087",
    bg: "#f0f4ff",
    border: "#003087",
    logo: "ZB",
    desc: "Transfer directly from your Zanaco account",
    fields: [
      { key: "accountNumber", label: "Account Number", placeholder: "1234567890", type: "text" },
      { key: "pin", label: "Internet Banking PIN", placeholder: "••••••", type: "password" },
    ],
    instruction: "You will be redirected to Zanaco internet banking to confirm.",
    fee: 0,
  },
  {
    id: "stanbic",
    name: "Stanbic Bank",
    short: "Stanbic",
    color: "#0033a0",
    bg: "#f0f4ff",
    border: "#0033a0",
    logo: "SB",
    desc: "Pay via Stanbic internet or mobile banking",
    fields: [
      { key: "accountNumber", label: "Account Number", placeholder: "9876543210", type: "text" },
      { key: "pin", label: "Banking PIN", placeholder: "••••••", type: "password" },
    ],
    instruction: "Approve the transaction in your Stanbic mobile app.",
    fee: 0,
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    short: "Cash",
    color: "#555",
    bg: "#f7f7f7",
    border: "#aaa",
    logo: "COD",
    desc: "Pay in cash when your order arrives",
    fields: [],
    instruction: "Have the exact amount ready. Our delivery partner will provide a receipt.",
    fee: 0,
  },
]

export default function PaymentGateway({ amount, onSuccess, onCancel }) {
  const [selected, setSelected] = useState("airtel")
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})
  const [stage, setStage] = useState("select") // select | confirm | processing | success | failed
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")

  const method = METHODS.find(m => m.id === selected)
  const total = amount + (method?.fee || 0)

  const setField = (k, v) => setFields(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    method.fields.forEach(f => {
      if (!fields[f.key]?.trim()) e[f.key] = "Required"
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setStage("confirm")
  }

  const handleConfirm = () => {
    if (selected !== "cash" && !otp.trim()) { setOtpError("Enter the code sent to your phone"); return }
    if (selected !== "cash" && otp !== "1234") { setOtpError("Incorrect code. Use 1234 for demo."); return }
    setStage("processing")
    setTimeout(() => setStage("success"), 2200)
  }

  const handleSuccess = () => {
    if (onSuccess) onSuccess({ method: method.name, amount: total })
  }

  if (stage === "processing") return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: "4px solid #e0e0e0", borderTopColor: "#1a5c2e", margin: "0 auto 1.5rem", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f1a13", marginBottom: "0.5rem" }}>Processing payment...</div>
      <div style={{ fontSize: "0.83rem", color: "#9aada0" }}>Please do not close this window</div>
    </div>
  )

  if (stage === "success") return (
    <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#e6f5ec", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a13", marginBottom: "0.75rem" }}>Payment Successful!</h2>
      <p style={{ color: "#6b7a6f", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        <strong>K{total.toLocaleString()}</strong> paid via <strong>{method.name}</strong>
      </p>
      <p style={{ color: "#9aada0", fontSize: "0.82rem", marginBottom: "2rem" }}>
        A receipt has been sent to your phone and email.
      </p>
      <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "2rem", display: "inline-block", textAlign: "left" }}>
        <div style={{ fontSize: "0.72rem", color: "#9aada0", marginBottom: "4px" }}>Transaction Reference</div>
        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a13", fontFamily: "monospace" }}>
          ZM{Date.now().toString().slice(-8)}
        </div>
      </div>
      <br />
      <button onClick={handleSuccess} style={{ background: "#1a5c2e", color: "#fff", border: "none", padding: "1rem 2.5rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
        Continue
      </button>
    </div>
  )

  if (stage === "confirm") return (
    <div style={{ padding: "1rem 0" }}>
      <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ fontSize: "0.75rem", color: "#9aada0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Payment Summary</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#6b7a6f" }}>Order amount</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>K{amount.toLocaleString()}</span>
        </div>
        {method.fee > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7a6f" }}>Processing fee</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>K{method.fee}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
          <span style={{ fontWeight: 700, color: "#0f1a13" }}>Total to pay</span>
          <span style={{ fontWeight: 900, fontSize: "1.2rem", color: "#1a5c2e" }}>K{total.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", background: method.bg, border: `1px solid ${method.border}20`, borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: method.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 800 }}>{method.logo}</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f1a13" }}>{method.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#9aada0" }}>{fields.phone || fields.cardNumber?.slice(-4) && `**** ${fields.cardNumber.slice(-4)}` || fields.accountNumber || "Selected"}</div>
        </div>
      </div>

      {selected !== "cash" && (
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ background: "#fff8ed", border: "1px solid #f0a84e", borderRadius: "10px", padding: "0.85rem 1rem", marginBottom: "1rem", fontSize: "0.8rem", color: "#8a5a00" }}>
            {method.instruction} A one-time code has been sent to your phone.
          </div>
          <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>
            Enter OTP / Confirmation Code
            <span style={{ fontWeight: 400, color: "#9aada0" }}> (use 1234 for demo)</span>
          </label>
          <input type="text" placeholder="Enter 4-digit code" value={otp} onChange={e => { setOtp(e.target.value); setOtpError("") }}
            maxLength={6}
            style={{ width: "100%", padding: "0.85rem 1rem", border: otpError ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "1.1rem", letterSpacing: "0.3em", outline: "none", textAlign: "center", boxSizing: "border-box" }} />
          {otpError && <div style={{ color: "#e05050", fontSize: "0.75rem", marginTop: "4px" }}>{otpError}</div>}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setStage("select")} style={{ flex: 1, padding: "0.9rem", background: "transparent", color: "#1a5c2e", border: "1.5px solid #1a5c2e", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Back</button>
        <button onClick={handleConfirm} style={{ flex: 2, padding: "0.9rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
          {selected === "cash" ? "Confirm Order" : "Confirm Payment"}
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9aada0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Select Payment Method</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1.5rem" }}>
          {METHODS.map(m => (
            <button key={m.id} onClick={() => { setSelected(m.id); setFields({}); setErrors({}) }} style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "0.85rem 1rem",
              borderRadius: "10px", cursor: "pointer", textAlign: "left",
              border: selected === m.id ? `2px solid ${m.color}` : "1.5px solid rgba(0,0,0,0.1)",
              background: selected === m.id ? m.bg : "#fff",
              transition: "all 0.15s"
            }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: "0.55rem", fontWeight: 800, textAlign: "center", lineHeight: 1.2 }}>{m.logo}</span>
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f1a13", lineHeight: 1.2 }}>{m.short}</div>
                {m.fee > 0 && <div style={{ fontSize: "0.65rem", color: "#c47b2b" }}>+K{m.fee} fee</div>}
                {m.fee === 0 && <div style={{ fontSize: "0.65rem", color: "#1a5c2e" }}>No extra fee</div>}
              </div>
            </button>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: method.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 800 }}>{method.logo}</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f1a13" }}>{method.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#9aada0" }}>{method.desc}</div>
            </div>
          </div>

          {method.fields.map(f => (
            <div key={f.key} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "5px" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={fields[f.key] || ""}
                onChange={e => { setField(f.key, e.target.value); setErrors(p => ({ ...p, [f.key]: null })) }}
                style={{ width: "100%", padding: "0.75rem 1rem", border: errors[f.key] ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box", background: "#fff" }} />
              {errors[f.key] && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "3px" }}>{errors[f.key]}</div>}
            </div>
          ))}

          {method.fields.length === 0 && (
            <div style={{ fontSize: "0.83rem", color: "#6b7a6f", lineHeight: 1.7 }}>{method.instruction}</div>
          )}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", padding: "1rem 1.25rem", border: "1px solid rgba(0,0,0,0.07)", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: "#9aada0" }}>Total to pay</div>
          {method.fee > 0 && <div style={{ fontSize: "0.7rem", color: "#c47b2b" }}>Includes K{method.fee} processing fee</div>}
        </div>
        <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1a5c2e", letterSpacing: "-0.5px" }}>K{total.toLocaleString()}</div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {onCancel && (
          <button onClick={onCancel} style={{ flex: 1, padding: "0.9rem", background: "transparent", color: "#9aada0", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "10px", fontSize: "0.88rem", cursor: "pointer" }}>
            Cancel
          </button>
        )}
        <button onClick={handlePay} style={{ flex: 2, padding: "0.9rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
          Pay K{total.toLocaleString()} with {method.short}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "1rem" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9aada0" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span style={{ fontSize: "0.72rem", color: "#9aada0" }}>256-bit SSL encryption &bull; PCI-DSS compliant &bull; ZedMarkets Secure Checkout</span>
      </div>
    </div>
  )
}