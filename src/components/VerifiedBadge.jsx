export default function VerifiedBadge({ size = "sm" }) {
  const sizes = {
    sm: { padding: "2px 7px", fontSize: "0.6rem", gap: "4px", iconSize: 10 },
    md: { padding: "3px 10px", fontSize: "0.68rem", gap: "5px", iconSize: 12 },
    lg: { padding: "5px 12px", fontSize: "0.75rem", gap: "6px", iconSize: 14 },
  }
  const s = sizes[size] || sizes.sm
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: s.gap,
      background: "#1d6ce6", color: "#fff",
      fontSize: s.fontSize, fontWeight: 700,
      padding: s.padding, borderRadius: "20px"
    }}>
      <svg width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Verified
    </span>
  )
}