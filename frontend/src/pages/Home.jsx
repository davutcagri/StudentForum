import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { CategorySidebar } from '../components/CategorySidebar'
import { PostCard } from '../components/PostCard'
import { PostForm } from '../components/PostForm'
import { UserSidebar } from '../components/UserSidebar'
import { usePostStore } from '../store/postStore'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'All' })
  const { posts, page, hasMore, loading, loadingMore, load, removePost } = usePostStore()

  useEffect(() => { load(0, false, null) }, [])

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    load(0, false, cat.id === 'all' ? null : cat.id)
  }

  const handleNewPost = () => {
    load(0, false, selectedCategory.id === 'all' ? null : selectedCategory.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <CategorySidebar selected={selectedCategory.name} onSelect={handleCategorySelect} />
        <main className="flex-1 min-w-0 space-y-4">
          <PostForm onPost={handleNewPost} />
          {loading ? (
            <div className="text-center py-10 text-gray-400 text-sm">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No posts yet. Be the first to share!
            </div>
          ) : (
            <>
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={removePost}
                />
              ))}
              {hasMore && (
                <button
                  onClick={() => load(page + 1, true)}
                  disabled={loadingMore}
                  className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl bg-white transition-colors disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load more'}
                </button>
              )}
            </>
          )}
        </main>
        <UserSidebar />
      </div>
    </div>
  )
}
