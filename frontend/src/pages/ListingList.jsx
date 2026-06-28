import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from '../api'
import ListingCard from '../components/ListingCard'

function ListingList() {
  const [listings, setListings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    API.get('/categories/').then(res => setCategories(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (query) params.q = query
    if (category) params.category = category
    API.get('/listings/', { params })
      .then(res => setListings(res.data))
      .finally(() => setLoading(false))
  }, [query, category])

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '25px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Фильтры */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSearchParams({})}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              background: !category ? '#ff6b35' : '#fff',
              color: !category ? 'white' : '#333',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            Все
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.slug })}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                background: category === cat.slug ? '#ff6b35' : '#fff',
                color: category === cat.slug ? 'white' : '#333',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Заголовок */}
        <h2 style={{ marginBottom: '15px', color: '#333' }}>
          {query ? `Результаты поиска: "${query}"` : 'Все объявления'}
          <span style={{ color: '#999', fontSize: '16px', marginLeft: '10px' }}>
            ({listings.length})
          </span>
        </h2>

        {/* Список */}
        {loading ? (
          <p style={{ color: '#999' }}>Загрузка...</p>
        ) : listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            <p style={{ fontSize: '50px' }}>📭</p>
            <p>Ничего не найдено</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px'
          }}>
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingList