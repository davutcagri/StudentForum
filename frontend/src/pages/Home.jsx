import { useState, useEffect, useCallback } from 'react'
import { Navbar } from '../components/Navbar'
import { CategorySidebar } from '../components/CategorySidebar'
import { PostCard } from '../components/PostCard'
import { PostForm } from '../components/PostForm'
import { OnlineNow } from '../components/OnlineNow'
import { getAllPostsApi } from '../api/post'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPosts = useCallback(async (pageNum = 0, append = false) => {
    try {
      const res = await getAllPostsApi(pageNum)
      const { content, page } = res.data
      setPosts(prev => append ? [...prev, ...content] : content)
      setHasMore(page.number < page.totalPages - 1)
      setPage(page.number)
    } catch {
      // keep existing posts on error
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts(0)
  }, [fetchPosts])

  const handleLoadMore = () => {
    setLoadingMore(true)
    fetchPosts(page + 1, true)
  }

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <CategorySidebar selected={selectedCategory} onSelect={setSelectedCategory} />
        <main className="flex-1 min-w-0 space-y-4">
          <PostForm onPost={() => fetchPosts(0)} />
          {loading ? (
            <div className="text-center py-10 text-gray-400 text-sm">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No posts yet. Be the first to share!
            </div>
          ) : (
            <>
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))}
                />
              ))}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl bg-white transition-colors disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load more'}
                </button>
              )}
            </>
          )}
        </main>
        <OnlineNow />
      </div>
    </div>
  )
}
