import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function MyListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/listings/my/').then(res => {
      setListings(res.data)
      setLoading(false)
    })
  }, [])

  const deleteListing = async (id) => {
    if (window.confirm('Удалить объявление?')) {
      await API.delete(`/listings/${id}/`)
      setListings(listings.filter(l => l.id !== id))
    }
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '25px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ color: '#333' }}>Мои объявления</h1>
          <Link to="/listings/create" style={{
            background: '#ff6b35',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            + Подать объявление
          </Link>
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Загрузка...</p>
        ) : listings.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: '50px', marginBottom: '15px' }}>📭</p>
            <p style={{ color: '#999', marginBottom: '20px' }}>
              У тебя пока нет объявлений
            </p>
            <Link to="/listings/create" style={{
              background: '#ff6b35',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}>
              Создать первое
            </Link>
          </div>
        ) : (
          listings.map(listing => (
            <div key={listing.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            }}>
              {/* Фото */}
              {listing.image_url ? (
                <img src={listing.image_url} style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }} />
              ) : (
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px'
                }}>
                  {listing.category_detail?.icon}
                </div>
              )}

              {/* Инфо */}
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '5px', color: '#333' }}>
                  {listing.title}
                </h3>
                <p style={{ color: '#ff6b35', fontWeight: 'bold' }}>
                  {listing.price.toLocaleString()} сом
                </p>
                <p style={{ color: '#999', fontSize: '13px' }}>
                  📍 {listing.location} •
                  {new Date(listing.created_at).toLocaleDateString('ru-RU')}
                </p>
              </div>

              {/* Статус */}
              <span style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                background: listing.status === 'active' ? '#d1fae5' : '#fee2e2',
                color: listing.status === 'active' ? '#059669' : '#dc2626'
              }}>
                {listing.status === 'active' ? '✓ Активно' : '✗ Неактивно'}
              </span>

              {/* Кнопки */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => navigate(`/listings/${listing.id}`)}
                  style={{
                    padding: '8px 14px',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#333'
                  }}
                >
                  👁️
                </button>
                <button
                  onClick={() => deleteListing(listing.id)}
                  style={{
                    padding: '8px 14px',
                    background: '#fee2e2',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#dc2626'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyListings