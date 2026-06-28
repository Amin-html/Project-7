import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ListingCreate from './pages/ListingCreate'
import ListingList from './pages/ListingList'
import ListingDetail from './pages/ListingDetail'
import MyListings from './pages/MyListings'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listings" element={<ListingList />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/listings/create" element={
            <ProtectedRoute>
              <ListingCreate />
            </ProtectedRoute>
          } />
          <Route path="/my-listings" element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App