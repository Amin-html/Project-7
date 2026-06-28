import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '5px', color: '#333' }}>Регистрация</h1>
        <p style={{ color: '#999', marginBottom: '25px', fontSize: '14px' }}>
          Создай аккаунт бесплатно
        </p>

        {error && (
          <div style={{
            background: '#fff5f5',
            border: '1px solid #ffcccc',
            color: '#e74c3c',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Логин
          </label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '15px',
              fontSize: '15px',
              outline: 'none'
            }}
          />

          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '20px',
              fontSize: '15px',
              outline: 'none'
            }}
          />

          <button type="submit" style={{
            width: '100%',
            padding: '13px',
            background: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Зарегистрироваться
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '14px' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{ color: '#ff6b35', textDecoration: 'none' }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register