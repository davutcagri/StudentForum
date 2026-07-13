import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi, loginApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { extractApiError } from '../utils/apiError'
import { MAJORS } from '../constants/majors'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [major, setMajor] = useState('')
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
      await registerApi(email, username, password, major)
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
          <p className="text-gray-500 text-sm mt-1.5">Join your campus community.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">University Email</label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Major</label>
            <div className="relative">
              <select
                value={major}
                onChange={e => setMajor(e.target.value)}
                required
                className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white"
              >
                <option value="" disabled className="text-gray-400">Select your major</option>
                {MAJORS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Create a password"
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
