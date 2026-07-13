import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Edit2, X } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { getAvatarColor, getInitials } from '../utils/avatar'
import { PostCard } from '../components/PostCard'
import { getUserByUsernameApi, updateMeApi, deleteMeApi } from '../api/auth'
import { getPostsByUsernameApi } from '../api/post'
import { extractApiError } from '../utils/apiError'
import { MAJORS } from '../constants/majors'

export default function Profile() {
  const { username: paramUsername } = useParams()
  const currentUsername = useAuthStore(s => s.username)
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()
  const isOwn = paramUsername === currentUsername

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [postsPage, setPostsPage] = useState(0)

  const [editing, setEditing] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editMajor, setEditMajor] = useState('')
  const [editError, setEditError] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setLoading(true)
    getUserByUsernameApi(paramUsername)
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
    fetchPosts(0)
  }, [paramUsername])

  const fetchPosts = async (pageNum = 0, append = false) => {
    setPostsLoading(true)
    try {
      const res = await getPostsByUsernameApi(paramUsername, pageNum)
      const { content, page } = res.data
      setPosts(prev => append ? [...prev, ...content] : content)
      setHasMore(page.number < page.totalPages - 1)
      setPostsPage(page.number)
    } finally {
      setPostsLoading(false)
    }
  }

  const openEdit = () => {
    setEditUsername(user.username)
    setEditEmail('')
    setEditMajor(user.major || '')
    setEditError('')
    setEditing(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setEditError('')
    setSaving(true)
    try {
      const payload = { username: editUsername, major: editMajor }
      if (editEmail) payload.email = editEmail
      const res = await updateMeApi(payload)
      const updated = res.data
      setUser(updated)
      setEditing(false)
      if (updated.username !== currentUsername) {
        login(updated.username)
        navigate(`/profile/${updated.username}`, { replace: true })
      }
    } catch (err) {
      setEditError(extractApiError(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteMeApi()
      logout()
      navigate('/login')
    } catch {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="font-bold text-lg">
            <span className="text-primary">Student</span>
            <span className="text-gray-900">Forum</span>
          </span>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading profile...</div>
      ) : !user ? (
        <div className="text-center py-20 text-gray-400 text-sm">User not found.</div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 pb-10">
          <div className="bg-gradient-to-r from-red-600 to-red-800 h-32 rounded-b-2xl" />

          <div className="-mt-10 px-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-sm ${getAvatarColor(user.username)}`}>
              {getInitials(user.username)}
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Username</label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={e => setEditUsername(e.target.value.toLowerCase())}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="New email address"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Major</label>
                  <div className="relative">
                    <select
                      value={editMajor}
                      onChange={e => setEditMajor(e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Select your major</option>
                      {MAJORS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {editError && <p className="text-xs text-red-500">{editError}</p>}
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary text-white text-sm px-4 py-1.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditing(false); setConfirmDelete(false) }}
                    className="flex items-center gap-1 border border-gray-300 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={13} />
                    Cancel
                  </button>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  {!confirmDelete ? (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete account
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-red-600">This will permanently delete your account. Are you sure?</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleDelete}
                          disabled={deleting}
                          className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {deleting ? 'Deleting...' : 'Yes, delete'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(false)}
                          className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{user.username}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    @{user.username}{user.major ? ` · ${user.major}` : ''}
                  </p>
                </div>
                {isOwn && (
                  <button
                    onClick={openEdit}
                    className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0 mt-1"
                  >
                    <Edit2 size={13} />
                    Edit Profile
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-5 mt-4 text-sm border-b border-gray-200 pb-5">
              <span>
                <strong className="text-gray-900">{posts.length}</strong>{' '}
                <span className="text-gray-500">Posts</span>
              </span>
            </div>
          </div>

          <div className="mt-5 px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Posts</p>
            {postsLoading && posts.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No posts yet.</div>
            ) : (
              <div className="space-y-3">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))}
                  />
                ))}
                {hasMore && (
                  <button
                    onClick={() => fetchPosts(postsPage + 1, true)}
                    disabled={postsLoading}
                    className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl bg-white transition-colors disabled:opacity-50"
                  >
                    {postsLoading ? 'Loading...' : 'Load more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
