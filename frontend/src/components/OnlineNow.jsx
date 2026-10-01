import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { getAllUsersApi } from '../api/auth'

export function OnlineNow() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsersApi()
      .then(res => setUsers(res.data))
      .catch(() => {})
  }, [])

  return (
    <aside className="hidden lg:block w-48 shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">All Users</p>
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.username}>
            <button
              onClick={() => navigate(`/profile/${user.username}`)}
              className="flex items-center gap-2.5 w-full text-left hover:opacity-80 transition-opacity"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(user.username)}`}>
                {getInitials(user.username)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                {user.major && <p className="text-xs text-gray-400 truncate">{user.major}</p>}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
