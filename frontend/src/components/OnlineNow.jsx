import { getAvatarColor, getInitials } from '../utils/avatar'

const ONLINE_USERS = [
  { username: 'alexchen', name: 'Alex Chen', department: 'Biology, Jr.' },
  { username: 'fatimahassan', name: 'Fatima Hassan', department: 'Economics, Sr.' },
  { username: 'liamobrien', name: "Liam O'Brien", department: 'Physics, Jr.' },
  { username: 'ninapetrova', name: 'Nina Petrova', department: 'Art History, Fr.' },
  { username: 'tomasrivera', name: 'Tomas Rivera', department: 'Engineering, Sr.' },
  { username: 'emmazhao', name: 'Emma Zhao', department: 'Psychology, Jr.' },
]

export function OnlineNow() {
  return (
    <aside className="hidden lg:block w-48 shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Online Now</p>
      <ul className="space-y-3">
        {ONLINE_USERS.map(user => (
          <li key={user.username} className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(user.username)}`}>
                {getInitials(user.username)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-gray-50" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.department}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
