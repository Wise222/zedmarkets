const products = [
  { id: 1, name: 'Samsung Galaxy A54 128GB', price: 'K2,800', seller: 'TechZed Lusaka', location: 'Lusaka', emoji: '??', verified: true },
  { id: 2, name: 'Chitenge Dress Handmade', price: 'K350', seller: 'Mama Grace Designs', location: 'Ndola', emoji: '??', verified: true },
  { id: 3, name: 'Fresh Maize 50kg Bags', price: 'K280', seller: 'Choma Farms', location: 'Choma', emoji: '??', verified: true },
  { id: 4, name: 'HP Laptop Core i5 8GB', price: 'K5,500', seller: 'Digital Hub Zambia', location: 'Lusaka', emoji: '??', verified: true },
  { id: 5, name: 'Nike Air Force 1 Original', price: 'K1,200', seller: 'Sneaker King ZM', location: 'Kitwe', emoji: '??', verified: true },
  { id: 6, name: 'Sofa Set 7 Seater', price: 'K4,800', seller: 'Lusaka Furniture Co', location: 'Lusaka', emoji: '???', verified: true },
]

function Listings() {
  return (
    <div style={{ padding: '8rem 4rem 4rem', background: '#fafaf8', minHeight: '100vh' }}>
      <h2 style={{
        fontFamily: 'sans-serif',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#0f1a13',
        marginBottom: '2rem'
      }}>Browse Products</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid rgba(26,92,46,0.12)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              height: '180px',
              background: '#e8f5ec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.5rem'
            }}>{product.emoji}</div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 500, marginBottom: '4px' }}>{product.name}</div>
              <div style={{ color: '#1a5c2e', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>{product.price}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7a6f' }}>
                {product.verified && <span style={{
                  background: '#e8f5ec',
                  color: '#1a5c2e',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  marginRight: '6px',
                  fontSize: '0.65rem',
                  fontWeight: 500
                }}>? Verified</span>}
                {product.seller}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7a6f', marginTop: '4px' }}>
                ?? {product.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listings
