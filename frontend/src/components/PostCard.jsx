import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronUp, MessageSquare, Trash2 } from 'lucide-react'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { CATEGORY_TAG_COLORS } from '../constants/categories'
import { useAuthStore } from '../store/authStore'
import { deletePostApi } from '../api/post'
import { saveCommentApi, getCommentsByPostIdApi, deleteCommentApi } from '../api/comment'
import { extractApiError } from '../utils/apiError'

function CommentSection({ postId, onCountChange }) {
  const navigate = useNavigate()
  const currentUsername = useAuthStore(s => s.username)
  const [comments, setComments] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loaded && !loading) {
    setLoading(true)
    getCommentsByPostIdApi(postId, 0, 3).then(res => {
      setComments(res.data.content ?? [])
      setLoaded(true)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setError('')
    setSubmitting(true)
    try {
      await saveCommentApi(commentText.trim(), postId)
      setCommentText('')
      const res = await getCommentsByPostIdApi(postId, 0, 3)
      setComments(res.data.content ?? [])
      onCountChange?.(1)
    } catch (err) {
      setError(extractApiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (id) => {
    try {
      await deleteCommentApi(id)
      setComments(prev => prev.filter(c => c.id !== id))
      onCountChange?.(-1)
    } catch {}
  }

  return (
    <div className="mt-3 border-t border-gray-100 pt-3 space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(currentUsername)}`}>
          {getInitials(currentUsername)}
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || submitting}
            className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 shrink-0"
          >
            {submitting ? '...' : 'Send'}
          </button>
        </div>
      </form>
      {error && <p className="text-xs text-red-500 pl-8">{error}</p>}

      {loading ? (
        <div className="text-xs text-gray-400 pl-8">Loading...</div>
      ) : comments.length === 0 ? (
        <div className="text-xs text-gray-400 pl-8">No comments yet.</div>
      ) : (
        <div className="space-y-2">
          {comments.map(c => (
            <div key={c.id} className="flex gap-2 group">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(c.author?.username)}`}>
                {getInitials(c.author?.username)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-gray-800">{c.author?.username} </span>
                <span className="text-xs text-gray-600">{c.content}</span>
              </div>
              {c.author?.username === currentUsername && (
                <button
                  onClick={() => handleDeleteComment(c.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => navigate(`/post/${postId}`)}
            className="text-xs text-primary hover:underline pl-8"
          >
            View all comments →
          </button>
        </div>
      )}
    </div>
  )
}

export function PostCard({ post, onDelete }) {
  const { author, timeAgo, category, title, content, commentCount = 0 } = post
  const currentUsername = useAuthStore(s => s.username)
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [localCommentCount, setLocalCommentCount] = useState(commentCount)
  const [showComments, setShowComments] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleLike = () => {
    setLikeCount(v => liked ? v - 1 : v + 1)
    setLiked(v => !v)
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deletePostApi(post.id)
      onDelete?.(post.id)
    } catch {
      setDeleting(false)
    }
  }

  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(author?.username)}`}>
            {getInitials(author?.username)}
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">{author?.username}</span>
            {timeAgo && <span className="text-xs text-gray-400 ml-2">{timeAgo}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {category && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${CATEGORY_TAG_COLORS[category] || 'bg-gray-100 text-gray-600'}`}>
              {category}
            </span>
          )}
          {author?.username === currentUsername && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <h3
        className="font-semibold text-gray-900 mb-1 leading-snug cursor-pointer hover:text-primary transition-colors"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{content}</p>

      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${liked ? 'text-primary font-semibold' : 'hover:text-primary'}`}
        >
          <ChevronUp size={14} />
          <span>{likeCount}</span>
        </button>
        <button
          onClick={() => setShowComments(v => !v)}
          className={`flex items-center gap-1 transition-colors ${showComments ? 'text-primary font-semibold' : 'hover:text-gray-700'}`}
        >
          <MessageSquare size={13} />
          <span>{localCommentCount} comments</span>
        </button>
        <button className="ml-auto hover:text-primary transition-colors font-medium">Share</button>
      </div>

      {showComments && (
        <CommentSection
          postId={post.id}
          onCountChange={delta => setLocalCommentCount(v => v + delta)}
        />
      )}
    </article>
  )
}
