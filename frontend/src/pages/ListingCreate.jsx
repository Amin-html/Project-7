import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function ListingCreate() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: ''
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/categories/').then(res => setCategories(res.data))
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    setImage(file)
    // Превью фото
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // FormData — для отправки файлов
      const data = new FormData()
      data.append('title', form.title)
      data.append('description', form.description)
      data.append('price', form.price)
      data.append('location', form.location)
      data.append('category', form.category)
      if (image) data.append('image', image)

      await API.post('/listings/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/')
    } catch (err) {
      setError('Ошибка при создании объявления')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '15px',
    fontSize: '15px',
    outline: 'none'
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '30px' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ marginBottom: '25px', color: '#333' }}>
          📝 Новое объявление
        </h1>

        {error && (
          <div style={{
            background: '#fff5f5',
            border: '1px solid #ffcccc',
            color: '#e74c3c',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Фото */}
          <div
            onClick={() => fileRef.current.click()}
            style={{
              border: '2px dashed #ddd',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
              background: '#fafafa'
            }}
          >
            {preview ? (
              <img src={preview} style={{
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover'
              }} />
            ) : (
              <>
                <p style={{ fontSize: '30px' }}>📷</p>
                <p style={{ color: '#999', fontSize: '14px' }}>
                  Нажми чтобы добавить фото
                </p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
          </div>

          {/* Заголовок */}
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Заголовок *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Например: iPhone 15 Pro Max"
            required
            style={inputStyle}
          />

          {/* Категория */}
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Категория *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={{ ...inputStyle, background: 'white' }}
          >
            <option value="">Выбери категорию</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {/* Цена */}
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Цена (сом) *
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="0"
            required
            style={inputStyle}
          />

          {/* Город */}
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Город *
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Бишкек"
            required
            style={inputStyle}
          />

          {/* Описание */}
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Описание *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Опиши товар подробнее..."
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#ccc' : '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Публикуем...' : '🚀 Опубликовать'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ListingCreate