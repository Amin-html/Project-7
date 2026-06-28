import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      background: 'white',
      padding: '12px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Логотип */}
      <Link to="/" style={{
        color: '#ff6b35',
        fontSize: '24px',
        fontWeight: 'bold',
        textDecoration: 'none'
      }}>
        lalafo
      </Link>

      {/* Поиск */}
      <div style={{ flex: 1, margin: '0 20px', maxWidth: '500px' }}>
        <input
          placeholder="Поиск по объявлениям..."
          onKeyDown={e => {
            if (e.key === 'Enter') {
              navigate(`/listings?q=${e.target.value}`)
            }
          }}
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '25px',
            border: '1px solid #ddd',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Правая часть */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {username ? (
          <>
            <Link to="/my-listings" style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Мои объявления
            </Link>
            <Link to="/listings/create" style={{
              background: '#ff6b35',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              + Подать объявление
            </Link>
            <span style={{ color: '#666', fontSize: '14px' }}>
              {username}
            </span>
            <button onClick={handleLogout} style={{
              background: 'none',
              border: '1px solid #ddd',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#666',
              fontSize: '14px'
            }}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Войти
            </Link>
            <Link to="/register" style={{
              background: '#ff6b35',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar