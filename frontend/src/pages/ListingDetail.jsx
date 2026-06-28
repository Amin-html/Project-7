import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'
import { useAuth } from '../context/AuthContext'

function ListingDetail() {
  const { id } = useParams()
  const { username, userId, token } = useAuth()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/listings/${id}/`).then(res => {
      setListing(res.data)
      setLoading(false)
    })
    if (token) {
      API.get(`/messages/${id}/`).then(res => setMessages(res.data))
    }
  }, [id])

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    const res = await API.post(`/messages/${id}/`, { text: newMessage })
    setMessages([...messages, res.data])
    setNewMessage('')
  }

  const deleteListing = async () => {
    if (window.confirm('Удалить объявление?')) {
      await API.delete(`/listings/${id}/`)
      navigate('/')
    }
  }

  if (loading) return (
    <div style={{ padding: '30px', textAlign: 'center', color: '#999' }}>
      Загрузка...
    </div>
  )

  if (!listing) return (
    <div style={{ padding: '30px', textAlign: 'center', color: '#999' }}>
      Объявление не найдено
    </div>
  )

  const isOwner = userId && listing.owner.id === parseInt(userId)

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '25px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>

          {/* Левая часть */}
          <div>
            {/* Фото */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              {listing.image_url ? (
                <img src={listing.image_url} style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover'
                }} />
              ) : (
                <div style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '80px',
                  background: '#f9f9f9'
                }}>
                  {listing.category_detail?.icon}
                </div>
              )}
            </div>

            {/* Инфо */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <p style={{ color: '#999', fontSize: '13px', marginBottom: '8px' }}>
                {listing.category_detail?.icon} {listing.category_detail?.name} •
                📍 {listing.location} •
                {new Date(listing.created_at).toLocaleDateString('ru-RU')}
              </p>
              <h1 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
                {listing.title}
              </h1>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6b35', marginBottom: '20px' }}>
                {listing.price.toLocaleString()} сом
              </p>
              <p style={{ color: '#555', lineHeight: '1.7' }}>
                {listing.description}
              </p>

              {/* Кнопки владельца */}
              {isOwner && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={() => navigate(`/listings/${id}/edit`)}
                    style={{
                      padding: '10px 20px',
                      background: '#333',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={deleteListing}
                    style={{
                      padding: '10px 20px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Удалить
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Правая часть */}
          <div>
            {/* Продавец */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>👤 Продавец</h3>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {listing.owner.username}
              </p>
            </div>

            {/* Чат */}
            {token && !isOwner && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>
                  💬 Написать продавцу
                </h3>

                {/* Сообщения */}
                <div style={{
                  maxHeight: '250px',
                  overflowY: 'auto',
                  marginBottom: '12px'
                }}>
                  {messages.map(msg => (
                    <div key={msg.id} style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      background: msg.sender_name === username ? '#ff6b35' : '#f5f5f5',
                      color: msg.sender_name === username ? 'white' : '#333',
                      alignSelf: msg.sender_name === username ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      marginLeft: msg.sender_name === username ? 'auto' : '0'
                    }}>
                      <p style={{ fontSize: '13px' }}>{msg.text}</p>
                      <p style={{
                        fontSize: '11px',
                        opacity: 0.7,
                        marginTop: '3px'
                      }}>
                        {msg.sender_name}
                      </p>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p style={{ color: '#999', fontSize: '13px', textAlign: 'center' }}>
                      Напиши первым!
                    </p>
                  )}
                </div>

                {/* Ввод сообщения */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Напиши сообщение..."
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      padding: '10px 15px',
                      background: '#ff6b35',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ➤
                  </button>
                </div>
              </div>
            )}

            {!token && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <p style={{ color: '#999', marginBottom: '10px' }}>
                  Войди чтобы написать продавцу
                </p>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '10px 20px',
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail