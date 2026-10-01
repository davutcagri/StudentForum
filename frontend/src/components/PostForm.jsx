import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useCategoryStore } from '../store/categoryStore'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { savePostApi } from '../api/post'
import { extractApiError } from '../utils/apiError'

export function PostForm({ onPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const username = useAuthStore(s => s.username)
  const { categories, fetch } = useCategoryStore()

  useEffect(() => { fetch() }, [fetch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !categoryId) return
    setError('')
    setLoading(true)
    try {
      await savePostApi(title.trim(), content.trim(), categoryId)
      setTitle('')
      setContent('')
      setCategoryId('')
      onPost?.()
    } catch (err) {
      setError(extractApiError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(username)}`}>
          {getInitials(username)}
        </div>
        <form onSubmit={handleSubmit} className="flex-1 space-y-3">
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-sm font-semibold placeholder-gray-400 border-b border-gray-200 pb-2 focus:outline-none focus:border-primary transition-colors"
          />
          <textarea
            placeholder="What's on your mind? Share a question, note, or event with your campus..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            className="w-full text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex items-center justify-between gap-3 pt-1">
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              required
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white text-gray-600"
            >
              <option value="" disabled>Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!title.trim() || !categoryId || loading}
              className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-40"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
