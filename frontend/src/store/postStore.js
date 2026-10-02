import { create } from 'zustand'
import { getAllPostsApi } from '../api/post'

export const usePostStore = create((set, get) => ({
  posts: [],
  page: 0,
  hasMore: false,
  loading: true,
  loadingMore: false,
  load: async (pageNum = 0, append = false) => {
    if (append) set({ loadingMore: true })
    try {
      const res = await getAllPostsApi(pageNum)
      const { content, number, totalPages } = res.data
      set(s => ({
        posts: append ? [...s.posts, ...content] : content,
        page: number,
        hasMore: number < totalPages - 1,
      }))
    } catch {}
    finally {
      set({ loading: false, loadingMore: false })
    }
  },
  removePost: (id) => set(s => ({ posts: s.posts.filter(p => p.id !== id) })),
}))
