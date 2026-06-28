import { Link } from 'react-router-dom'

function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing.id}`} style={{ textDecoration: 'none', color: '#333' }}>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        {/* Фото */}
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.title}
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            height: '180px',
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            {listing.category_detail?.icon || '📦'}
          </div>
        )}

        {/* Инфо */}
        <div style={{ padding: '12px' }}>
          <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ff6b35',
            marginBottom: '5px'
          }}>
            {listing.price.toLocaleString()} сом
          </p>
          <h3 style={{
            fontSize: '14px',
            marginBottom: '8px',
            color: '#333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {listing.title}
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#999',
            fontSize: '12px'
          }}>
            <span>📍 {listing.location}</span>
            <span>{new Date(listing.created_at).toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard