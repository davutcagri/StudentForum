import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { getMeApi } from './api/auth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'

function AuthProvider({ children }) {
  const setInitialized = useAuthStore(s => s.setInitialized)

  useEffect(() => {
    getMeApi()
      .then(res => setInitialized(res.data.username))
      .catch(() => setInitialized(null))
  }, [])

  return children
}

function ProtectedRoute({ children }) {
  const username = useAuthStore(s => s.username)
  const initializing = useAuthStore(s => s.initializing)
  if (initializing) return null
  return username ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const username = useAuthStore(s => s.username)
  const initializing = useAuthStore(s => s.initializing)
  if (initializing) return null
  return !username ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
