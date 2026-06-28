import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Защищённый роут — если не авторизован редирект на /login
function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" />
  return children
}

export default ProtectedRoute