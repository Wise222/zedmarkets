export default function About() {
  const team = [
    { name: "Chanda Mwamba", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
    { name: "Grace Phiri", role: "Head of Trust & Safety", img: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80" },
    { name: "Bwalya Tembo", role: "CTO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Monde Mutale", role: "Head of Operations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  ]
  const stats = [["2022", "Year founded"], ["1,240+", "Verified sellers"], ["8,500+", "Active listings"], ["9", "Provinces covered"]]

  return (
    <div style={{ paddingTop: "0" }}>
      <section style={{
        minHeight: "55vh", background: "linear-gradient(160deg, #0a1209, #163520)",
        display: "flex", alignItems: "center", padding: "5rem",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "url('https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1400&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
          <p style={{ color: "#f0a84e", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Our story</p>
          <h1 style={{ color: "#fff", fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "1.5rem" }}>
            We built ZedMarkets because we got scammed too.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.85 }}>
            In 2022, our founders were frustrated by the lack of trust in Zambian online marketplaces. Fake sellers, missing deliveries, and zero accountability. So we built the solution ourselves.
          </p>
        </div>
      </section>

      <section style={{ padding: "6rem 5rem", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a5c2e", marginBottom: "0.75rem" }}>The mission</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f1a13", lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.5px" }}>Creating an economy of trust in Zambia</h2>
            <p style={{ color: "#6b7a6f", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              ZedMarkets is built on one principle: no anonymous seller ever lists a product. Every seller provides a valid NRC or passport, a phone number, and a physical address before their first listing is approved.
            </p>
            <p style={{ color: "#6b7a6f", lineHeight: 1.85, fontSize: "0.95rem" }}>
              We cover all 9 provinces of Zambia and are growing. Our goal is to be the most trusted place to buy and sell anything in the country â€” from a phone in Lusaka to a bag of maize in Choma.
            </p>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "400px" }}>
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem", background: "#0f1a13" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map(([n, l]) => (
            <div key={l}>
              <div style={{ color: "#f0a84e", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1px" }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "6px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 5rem", background: "#fafaf8" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a5c2e", marginBottom: "0.75rem", textAlign: "center" }}>The team</p>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f1a13", textAlign: "center", marginBottom: "3rem", letterSpacing: "-0.5px" }}>The people behind ZedMarkets</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
          {team.map(m => (
            <div key={m.name} style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ height: "240px" }}>
                <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f1a13", marginBottom: "3px" }}>{m.name}</div>
                <div style={{ fontSize: "0.78rem", color: "#1a5c2e", fontWeight: 500 }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}