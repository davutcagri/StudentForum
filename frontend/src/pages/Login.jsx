import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { extractApiError } from '../utils/apiError'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginApi(username, password)
      login(username)
      navigate('/')
    } catch (err) {
      setError(extractApiError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-900 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Student</span>
            <span className="text-gray-900">Forum</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">Welcome back. Log in to keep the conversation going.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <input
              type="text"
              placeholder="e.g. janeDoe"
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase())}
              required
              autoFocus
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
