import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const provinces = ["Lusaka","Copperbelt","Central","Eastern","Western","Northern","Luapula","North-Western","Southern","Muchinga"]
const categories = ["Electronics","Clothing","Food & Agri","Property","Vehicles","Services","Health & Beauty","Sports","Books & Education","Other"]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [role, setRole] = useState(searchParams.get("role") === "seller" ? "seller" : "buyer")
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [verifying, setVerifying] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    province: "", town: "", address: "",
    businessName: "", businessType: "", nrc: "", description: "", website: "",
    idType: "nrc", idNumber: "", idPhoto: "", selfie: "",
    categories: [], acceptTerms: false
  })

  useEffect(() => {
    const r = searchParams.get("role")
    if (r === "seller") setRole("seller")
  }, [searchParams])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toggleCat = (c) => set("categories", form.categories.includes(c) ? form.categories.filter(x => x !== c) : [...form.categories, c])

  const validate1 = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = "Required"
    if (!form.lastName.trim()) e.lastName = "Required"
    if (!form.email.includes("@")) e.email = "Valid email required"
    if (!form.phone.trim()) e.phone = "Required"
    if (form.password.length < 6) e.password = "Minimum 6 characters"
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match"
    if (!form.province) e.province = "Select your province"
    setErrors(e); return Object.keys(e).length === 0
  }

  const validate2 = () => {
    const e = {}
    if (role === "seller") {
      if (!form.businessName.trim()) e.businessName = "Required"
      if (!form.nrc.trim()) e.nrc = "Required for verification"
      if (form.categories.length === 0) e.categories = "Select at least one category"
    }
    if (!form.acceptTerms) e.acceptTerms = "You must accept the terms"
    setErrors(e); return Object.keys(e).length === 0
  }

  const validate3 = () => {
    const e = {}
    if (!form.idNumber.trim()) e.idNumber = "Enter your ID number"
    if (!form.idPhoto) e.idPhoto = "Please upload a photo of your ID"
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleNext1 = () => { if (validate1()) setStep(2) }
  const handleNext2 = () => { if (validate2()) setStep(role === "seller" ? 3 : "done") }

  const handleVerifySubmit = () => {
    if (!validate3()) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      const userData = register({ ...form, role, verified: true, verifiedDate: new Date().toLocaleDateString() })
      navigate(role === "seller" ? "/seller/dashboard" : "/buyer/dashboard")
    }, 2000)
  }

  const handleSkipVerify = () => {
    register({ ...form, role, verified: false })
    navigate(role === "seller" ? "/seller/dashboard" : "/buyer/dashboard")
  }

  const inp = (key, label, type = "text", placeholder = "") => (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
        style={{ width: "100%", padding: "0.75rem 1rem", border: errors[key] ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
      {errors[key] && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors[key]}</div>}
    </div>
  )

  const totalSteps = role === "seller" ? 3 : 3
  const stepLabels = role === "seller"
    ? ["Personal Info", "Business Info", "ID Verification"]
    : ["Personal Info", "Preferences", "ID Verification"]

  return (
    <div style={{ paddingTop: "0", minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4rem 2rem 5rem" }}>
      <div style={{ width: "100%", maxWidth: "580px" }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link to="/"><span style={{ color: "#0f1a13", fontWeight: 800, fontSize: "1.6rem" }}>Zed<span style={{ color: "#f0a84e" }}>Markets</span></span></Link>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f1a13", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Create your account</h1>
          <p style={{ color: "#9aada0", fontSize: "0.88rem" }}>Already have an account? <Link to="/login" style={{ color: "#1a5c2e", fontWeight: 600 }}>Sign in</Link></p>
        </div>

        <div style={{ display: "flex", background: "#f0f0f0", borderRadius: "10px", padding: "4px", marginBottom: "2rem" }}>
          {["buyer","seller"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1, padding: "0.7rem", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600,
              background: role === r ? "#fff" : "transparent", color: role === r ? "#0f1a13" : "#9aada0",
              boxShadow: role === r ? "0 1px 4px rgba(0,0,0,0.1)" : "none"
            }}>{r === "buyer" ? "I want to Buy" : "I want to Sell"}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
          {[1,2,3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
                background: step > s ? "#1a5c2e" : step === s ? (s === 3 ? "#1d6ce6" : "#1a5c2e") : "#e0e0e0",
                color: step >= s ? "#fff" : "#9aada0" }}>
                {step > s ? "\u2713" : s}
              </div>
              <div style={{ fontSize: "0.7rem", color: step >= s ? (s === 3 ? "#1d6ce6" : "#1a5c2e") : "#9aada0", marginLeft: "6px", fontWeight: step >= s ? 600 : 400, whiteSpace: "nowrap" }}>
                {stepLabels[i]}
              </div>
              {s < 3 && <div style={{ flex: 1, height: "2px", background: step > s ? "#1a5c2e" : "#e0e0e0", margin: "0 8px" }} />}
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.08)" }}>

          {step === 1 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                {inp("firstName", "First Name", "text", "Chanda")}
                {inp("lastName", "Last Name", "text", "Mwamba")}
              </div>
              {inp("email", "Email Address", "email", "you@example.com")}
              {inp("phone", "Phone / WhatsApp Number", "tel", "+260 97 123 4567")}
              {inp("password", "Password", "password", "Min 6 characters")}
              {inp("confirmPassword", "Confirm Password", "password", "Repeat password")}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Province</label>
                <select value={form.province} onChange={e => set("province", e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: errors.province ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", background: "#fff" }}>
                  <option value="">Select province</option>
                  {provinces.map(p => <option key={p}>{p}</option>)}
                </select>
                {errors.province && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors.province}</div>}
              </div>
              {inp("town", "Town / City", "text", "Lusaka")}
              <button onClick={handleNext1} style={{ width: "100%", padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", marginTop: "0.5rem" }}>
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {role === "seller" ? (
                <>
                  {inp("businessName", "Business / Shop Name", "text", "TechZed Lusaka")}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Business Type</label>
                    <select value={form.businessType} onChange={e => set("businessType", e.target.value)}
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", background: "#fff" }}>
                      <option value="">Select type</option>
                      {["Sole Trader","Partnership","Limited Company","NGO / Non-profit","Individual Seller"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  {inp("nrc", "NRC / Passport Number", "text", "123456/78/9")}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>
                      Product Categories <span style={{ fontWeight: 400, color: "#9aada0" }}>(select all that apply)</span>
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {categories.map(c => (
                        <button key={c} onClick={() => toggleCat(c)} type="button" style={{
                          padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                          border: form.categories.includes(c) ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.15)",
                          background: form.categories.includes(c) ? "#e6f5ec" : "#fff",
                          color: form.categories.includes(c) ? "#1a5c2e" : "#555"
                        }}>{c}</button>
                      ))}
                    </div>
                    {errors.categories && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors.categories}</div>}
                  </div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Business Description</label>
                    <textarea rows={3} placeholder="Tell buyers about your business..." value={form.description} onChange={e => set("description", e.target.value)}
                      style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                  {inp("website", "Website / Social Media (optional)", "text", "instagram.com/yourbusiness")}
                </>
              ) : (
                <>
                  <p style={{ fontSize: "0.88rem", color: "#6b7a6f", marginBottom: "1.5rem", lineHeight: 1.7 }}>Almost there! Choose your preferences so we show you the most relevant listings.</p>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Preferred Categories</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {categories.map(c => (
                        <button key={c} onClick={() => toggleCat(c)} type="button" style={{
                          padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.78rem", cursor: "pointer",
                          border: form.categories.includes(c) ? "2px solid #1a5c2e" : "1.5px solid rgba(0,0,0,0.15)",
                          background: form.categories.includes(c) ? "#e6f5ec" : "#fff",
                          color: form.categories.includes(c) ? "#1a5c2e" : "#555"
                        }}>{c}</button>
                      ))}
                    </div>
                  </div>
                  {inp("address", "Delivery Address", "text", "Plot 1234, Cairo Road, Lusaka")}
                </>
              )}

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "1.5rem" }}>
                <input type="checkbox" id="terms" checked={form.acceptTerms} onChange={e => set("acceptTerms", e.target.checked)} style={{ marginTop: "2px", cursor: "pointer" }} />
                <label htmlFor="terms" style={{ fontSize: "0.8rem", color: "#6b7a6f", cursor: "pointer", lineHeight: 1.6 }}>
                  I agree to ZedMarkets <span style={{ color: "#1a5c2e", fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: "#1a5c2e", fontWeight: 600 }}>Privacy Policy</span>.
                </label>
              </div>
              {errors.acceptTerms && <div style={{ color: "#e05050", fontSize: "0.72rem", marginBottom: "1rem" }}>{errors.acceptTerms}</div>}

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", background: "transparent", color: "#1a5c2e", border: "1.5px solid #1a5c2e", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Back</button>
                <button onClick={handleNext2} style={{ flex: 2, padding: "1rem", background: "#1a5c2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
                  Continue to ID Verification
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ background: "#e6f0ff", border: "1px solid #1d6ce6", borderRadius: "12px", padding: "1.25rem", marginBottom: "2rem", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1d6ce6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: "1rem", fontWeight: 800 }}>&#10003;</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1d4ca0", fontSize: "0.88rem", marginBottom: "3px" }}>Get your blue Verified badge</div>
                  <div style={{ fontSize: "0.78rem", color: "#3a5a90", lineHeight: 1.6 }}>
                    Verified accounts get a blue badge on their profile and all listings. Buyers trust verified sellers more and you will appear higher in search results.
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "8px" }}>ID Type</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[["nrc", "NRC Card"], ["passport", "Passport"], ["drivers", "Driver's License"]].map(([val, lbl]) => (
                    <button key={val} onClick={() => set("idType", val)} type="button" style={{
                      flex: 1, padding: "0.6rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                      border: form.idType === val ? "2px solid #1d6ce6" : "1.5px solid rgba(0,0,0,0.15)",
                      background: form.idType === val ? "#e6f0ff" : "#fff",
                      color: form.idType === val ? "#1d4ca0" : "#555"
                    }}>{lbl}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>
                  {form.idType === "nrc" ? "NRC Number" : form.idType === "passport" ? "Passport Number" : "License Number"}
                </label>
                <input type="text" placeholder={form.idType === "nrc" ? "123456/78/9" : form.idType === "passport" ? "ZM1234567" : "ZM-12345"} value={form.idNumber} onChange={e => set("idNumber", e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: errors.idNumber ? "1.5px solid #e05050" : "1.5px solid rgba(0,0,0,0.15)", borderRadius: "8px", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }} />
                {errors.idNumber && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors.idNumber}</div>}
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Upload Photo of Your ID</label>
                <div
                  onClick={() => set("idPhoto", "uploaded_id_" + Date.now())}
                  style={{ border: errors.idPhoto ? "2px dashed #e05050" : form.idPhoto ? "2px solid #1d6ce6" : "2px dashed rgba(0,0,0,0.15)", borderRadius: "10px", padding: "2rem", textAlign: "center", cursor: "pointer", background: form.idPhoto ? "#e6f0ff" : "#fafafa", transition: "all 0.15s" }}>
                  {form.idPhoto ? (
                    <div>
                      <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>&#10003;</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1d4ca0" }}>ID photo uploaded</div>
                      <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "2px" }}>Click to change</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#e0e0e0", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#555" }}>Click to upload ID photo</div>
                      <div style={{ fontSize: "0.72rem", color: "#9aada0", marginTop: "2px" }}>JPG, PNG or PDF. Max 5MB.</div>
                    </div>
                  )}
                </div>
                {errors.idPhoto && <div style={{ color: "#e05050", fontSize: "0.72rem", marginTop: "4px" }}>{errors.idPhoto}</div>}
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#0f1a13", marginBottom: "6px" }}>Selfie Holding Your ID <span style={{ fontWeight: 400, color: "#9aada0" }}>(optional but recommended)</span></label>
                <div
                  onClick={() => set("selfie", "uploaded_selfie_" + Date.now())}
                  style={{ border: form.selfie ? "2px solid #1d6ce6" : "2px dashed rgba(0,0,0,0.15)", borderRadius: "10px", padding: "1.5rem", textAlign: "center", cursor: "pointer", background: form.selfie ? "#e6f0ff" : "#fafafa" }}>
                  {form.selfie ? (
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1d4ca0" }}>&#10003; Selfie uploaded</div>
                  ) : (
                    <div style={{ fontSize: "0.82rem", color: "#9aada0" }}>Click to upload a selfie holding your ID</div>
                  )}
                </div>
              </div>

              <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem", fontSize: "0.75rem", color: "#6b7a6f", lineHeight: 1.7 }}>
                Your ID information is encrypted and stored securely. It is only used to verify your identity and will never be shared with buyers or third parties. You can request deletion at any time.
              </div>

              {verifying ? (
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1d6ce6", marginBottom: "0.5rem" }}>Verifying your identity...</div>
                  <div style={{ fontSize: "0.8rem", color: "#9aada0" }}>This takes just a moment</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button onClick={handleVerifySubmit} style={{ width: "100%", padding: "1rem", background: "#1d6ce6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>
                    Submit for Verification &amp; Get Blue Badge
                  </button>
                  <button onClick={handleSkipVerify} style={{ width: "100%", padding: "0.85rem", background: "transparent", color: "#9aada0", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: "10px", fontSize: "0.85rem", cursor: "pointer" }}>
                    Skip for now (verify later in settings)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}