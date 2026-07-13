import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { logoutApi } from '../api/auth'
import { searchUsersApi } from '../api/search'
import { getAvatarColor, getInitials } from '../utils/avatar'

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const { username, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([])
      setSearchOpen(false)
      return
    }
    const t = setTimeout(() => {
      searchUsersApi(query.trim())
        .then(res => {
          setSearchResults(res.data.content ?? [])
          setSearchOpen(true)
        })
        .catch(() => setSearchResults([]))
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const handleLogout = async () => {
    await logoutApi()
    logout()
    navigate('/login')
  }

  const handleSelectUser = (u) => {
    setQuery('')
    setSearchOpen(false)
    navigate(`/profile/${u.username}`)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="font-bold text-xl shrink-0">
          <span className="text-primary">Student</span>
          <span className="text-gray-900">Forum</span>
        </Link>

        <div className="flex-1 max-w-md mx-auto hidden sm:block" ref={searchRef}>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search people..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 max-h-64 overflow-y-auto">
                {searchResults.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUser(u)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(u.username)}`}>
                      {getInitials(u.username)}
                    </div>
                    <span className="text-sm text-gray-800">{u.username}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(username)}`}
            >
              {getInitials(username)}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">
                  @{username}
                </div>
                <button
                  onClick={() => { navigate(`/profile/${username}`); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User size={14} />
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
