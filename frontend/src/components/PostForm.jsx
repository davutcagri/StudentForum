import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { savePostApi } from '../api/post'
import { extractApiError } from '../utils/apiError'

export function PostForm({ onPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const username = useAuthStore(s => s.username)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setError('')
    setLoading(true)
    try {
      await savePostApi(title.trim(), content.trim())
      setTitle('')
      setContent('')
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
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={!title.trim() || loading}
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
