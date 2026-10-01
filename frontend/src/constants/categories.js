const PALETTE = [
  { dotColor: 'bg-blue-500', tagColor: 'bg-blue-100 text-blue-700' },
  { dotColor: 'bg-green-500', tagColor: 'bg-green-100 text-green-700' },
  { dotColor: 'bg-yellow-500', tagColor: 'bg-yellow-100 text-yellow-700' },
  { dotColor: 'bg-purple-500', tagColor: 'bg-purple-100 text-purple-700' },
  { dotColor: 'bg-pink-500', tagColor: 'bg-pink-100 text-pink-700' },
  { dotColor: 'bg-teal-500', tagColor: 'bg-teal-100 text-teal-700' },
  { dotColor: 'bg-orange-500', tagColor: 'bg-orange-100 text-orange-700' },
  { dotColor: 'bg-indigo-500', tagColor: 'bg-indigo-100 text-indigo-700' },
]

export function getCategoryColor(name) {
  if (!name) return { dotColor: 'bg-gray-400', tagColor: 'bg-gray-100 text-gray-600' }
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return PALETTE[hash % PALETTE.length]
}
