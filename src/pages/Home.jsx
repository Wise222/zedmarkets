function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1a13 0%, #1a5c2e 60%, #2d8a4e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8rem 4rem 4rem',
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem'
      }}>Zambia's Trusted Marketplace</p>

      <h1 style={{
        color: '#fff',
        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '1.5rem',
        fontFamily: 'sans-serif'
      }}>
        Buy Smart.<br />
        Sell <span style={{ color: '#f0a84e' }}>Confidently.</span><br />
        Trust Zambia.
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.65)',
        fontSize: '1.05rem',
        maxWidth: '500px',
        lineHeight: 1.8,
        marginBottom: '2.5rem'
      }}>
        ZedMarkets connects verified Zambian sellers with buyers who are tired of getting scammed. Every seller is checked before they can list anything.
      </p>

      <div style={{ display: 'flex', gap: 0, maxWidth: '580px' }}>
        <input
          type="text"
          placeholder="Search for phones, food, clothing..."
          style={{
            flex: 1,
            padding: '1rem 1.5rem',
            border: 'none',
            borderRadius: '12px 0 0 12px',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
        <button style={{
          background: '#c47b2b',
          color: '#fff',
          border: 'none',
          padding: '1rem 1.8rem',
          borderRadius: '0 12px 12px 0',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}>Search</button>
      </div>

      <div style={{
        marginTop: '3rem',
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>1,240+</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Verified sellers</div>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>8,500+</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Active listings</div>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>Zero</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Tolerance for scams</div>
        </div>
      </div>
    </div>
  )
}

export default Home
