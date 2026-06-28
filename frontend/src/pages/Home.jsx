import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import ListingCard from '../components/ListingCard'

function Home() {
  const [listings, setListings] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/listings/').then(res => setListings(res.data))
    API.get('/categories/').then(res => setCategories(res.data))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/listings?q=${query}`)
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero секция */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
        padding: '50px 30px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '10px' }}>
          Купи и продай всё что угодно
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '25px' }}>
          Бесплатные объявления по всему Кыргызстану
        </p>

        {/* Поиск */}
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          maxWidth: '500px',
          margin: '0 auto',
          gap: '10px'
        }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Что ищешь?"
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            padding: '14px 25px',
            background: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Найти
          </button>
        </form>
      </div>

      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Категории */}
        <h2 style={{ marginBottom: '15px', color: '#333' }}>Категории</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
          marginBottom: '35px'
        }}>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`/listings?category=${cat.slug}`)}
              style={{
                background: 'white',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '28px', marginBottom: '5px' }}>{cat.icon}</div>
              <p style={{ fontSize: '12px', color: '#555' }}>{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Свежие объявления */}
        <h2 style={{ marginBottom: '15px', color: '#333' }}>Свежие объявления</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px'
        }}>
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {listings.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#999'
          }}>
            <p style={{ fontSize: '50px' }}>📭</p>
            <p>Пока нет объявлений</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home