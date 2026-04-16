import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 4rem',
      background: '#1a5c2e',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.4rem',
          fontFamily: 'sans-serif'
        }}>Zed<span style={{ color: '#f0a84e' }}>Markets</span></span>
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
        <Link to="/listings" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Browse</Link>
      </div>
      <button style={{
        background: '#c47b2b',
        color: '#fff',
        border: 'none',
        padding: '0.6rem 1.4rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 500
      }}>Sell Now</button>
    </nav>
  )
}

export default Navbar
