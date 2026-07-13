import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { getPostByIdApi, deletePostApi } from '../api/post'
import { saveCommentApi, getCommentsByPostIdApi, deleteCommentApi } from '../api/comment'
import { useAuthStore } from '../store/authStore'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { extractApiError } from '../utils/apiError'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentUsername = useAuthStore(s => s.username)

  const [post, setPost] = useState(null)
  const [postLoading, setPostLoading] = useState(true)

  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)

  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    getPostByIdApi(id)
      .then(res => setPost(res.data))
      .catch(() => setPost(null))
      .finally(() => setPostLoading(false))
    loadComments(0)
  }, [id])

  const loadComments = async (pageNum = 0, append = false) => {
    setCommentsLoading(true)
    try {
      const res = await getCommentsByPostIdApi(id, pageNum)
      const { content, page: meta } = res.data
      setComments(prev => append ? [...prev, ...content] : content)
      setHasMore(meta.number < meta.totalPages - 1)
      setPage(meta.number)
    } finally {
      setCommentsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setCommentError('')
    setSubmitting(true)
    try {
      await saveCommentApi(commentText.trim(), Number(id))
      setCommentText('')
      loadComments(0)
      setPost(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : prev)
    } catch (err) {
      setCommentError(extractApiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentApi(commentId)
      setComments(prev => prev.filter(c => c.id !== commentId))
      setPost(prev => prev ? { ...prev, commentCount: Math.max(0, (prev.commentCount || 0) - 1) } : prev)
    } catch {}
  }

  const handleDeletePost = async () => {
    try {
      await deletePostApi(id)
      navigate(-1)
    } catch {}
  }

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        Post not found.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 transition-colors">
            <ChevronLeft size={22} />
          </button>
          <span className="font-bold text-lg">
            <span className="text-primary">Student</span>
            <span className="text-gray-900">Forum</span>
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(post.author?.username)}`}>
                {getInitials(post.author?.username)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author?.username}</p>
                {post.author?.major && (
                  <p className="text-xs text-gray-400">{post.author.major}</p>
                )}
              </div>
            </div>
            {post.author?.username === currentUsername && (
              <button onClick={handleDeletePost} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{post.title}</h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            {post.commentCount ?? comments.length} Comments
          </h3>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(currentUsername)}`}>
              {getInitials(currentUsername)}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
              <button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 shrink-0"
              >
                {submitting ? '...' : 'Send'}
              </button>
            </div>
          </form>
          {commentError && <p className="text-xs text-red-500 mb-3 pl-9">{commentError}</p>}

          {commentsLoading && comments.length === 0 ? (
            <div className="text-xs text-gray-400 pl-9">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-xs text-gray-400 pl-9">No comments yet. Be the first!</div>
          ) : (
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-2.5 group">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${getAvatarColor(c.author?.username)}`}>
                    {getInitials(c.author?.username)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800">{c.author?.username} </span>
                    <span className="text-sm text-gray-600">{c.content}</span>
                  </div>
                  {c.author?.username === currentUsername && (
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all shrink-0 mt-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
              {hasMore && (
                <button
                  onClick={() => loadComments(page + 1, true)}
                  disabled={commentsLoading}
                  className="w-full text-sm text-gray-500 hover:text-primary transition-colors py-2 border border-gray-200 rounded-lg disabled:opacity-50"
                >
                  {commentsLoading ? 'Loading...' : 'Load more comments'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
