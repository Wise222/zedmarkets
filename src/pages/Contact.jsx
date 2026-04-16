import { useState } from "react"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true)
  }

  return (
    <div style={{ paddingTop: "0" }}>
      <section style={{ background: "linear-gradient(160deg, #0a1209, #163520)", padding: "4rem 5rem" }}>
        <p style={{ color: "#f0a84e", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Get in touch</p>
        <h1 style={{ color: "#fff", fontSize: "3rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "1rem" }}>Contact ZedMarkets</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: "480px", lineHeight: 1.8 }}>
          Our Lusaka-based team is ready to help â€” whether you have a seller inquiry, a buyer complaint, or just want to say hello.
        </p>
      </section>

      <section style={{ padding: "6rem 5rem", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem", letterSpacing: "-0.3px" }}>How to reach us</h2>
          {[
            { label: "Office Address", value: "Plot 1234, Cairo Road, Lusaka, Zambia" },
            { label: "Phone / WhatsApp", value: "+260 97 123 4567" },
            { label: "Email", value: "hello@zedmarkets.zm" },
            { label: "Support Hours", value: "Monâ€“Fri, 08:00â€“17:00 CAT" },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a5c2e", fontWeight: 600, marginBottom: "4px" }}>{item.label}</div>
              <div style={{ fontSize: "0.95rem", color: "#0f1a13", fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
          <div style={{ marginTop: "3rem", borderRadius: "14px", overflow: "hidden", height: "220px" }}>
            <img src="https://images.unsplash.com/photo-1577086664693-894d8405334a?w=800&q=80" alt="Lusaka" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.08)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ width: "56px", height: "56px", background: "#e6f5ec", borderRadius: "50%", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "20px", height: "20px", background: "#1a5c2e", borderRadius: "50%" }} />
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f1a13", marginBottom: "0.75rem" }}>Message sent!</h3>
              <p style={{ color: "#6b7a6f", fontSize: "0.88rem", lineHeight: 1.75 }}>We will get back to you within 24 hours on business days.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f1a13", marginBottom: "2rem" }}>Send us a message</h2>
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                { key: "subject", label: "Subject", type: "text", placeholder: "What is this about?" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "8px", fontSize: "0.88rem", outline: "none" }} />
                </div>
              ))}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", resize: "vertical" }} />
              </div>
              <button onClick={handleSubmit} style={{ width: "100%", background: "#1a5c2e", color: "#fff", border: "none", padding: "0.95rem", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 600, cursor: "pointer" }}>
                Send Message
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}