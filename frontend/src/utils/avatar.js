const COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-amber-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-500',
]

export function getAvatarColor(username) {
  const idx = (username?.charCodeAt(0) ?? 0) % COLORS.length
  return COLORS[idx]
}

export function getInitials(username) {
  if (!username) return '?'
  return username.slice(0, 2).toUpperCase()
}
