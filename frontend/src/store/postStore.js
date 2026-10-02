import { create } from 'zustand'
import { getAllPostsApi, getPostsByCategoryApi } from '../api/post'

export const usePostStore = create((set, get) => ({
  posts: [],
  page: 0,
  hasMore: false,
  loading: true,
  loadingMore: false,
  activeCategoryId: null,
  load: async (pageNum = 0, append = false, categoryId = undefined) => {
    const active = append ? get().activeCategoryId : (categoryId ?? null)
    if (append) set({ loadingMore: true })
    else set({ loading: true, activeCategoryId: active })
    try {
      const res = active
        ? await getPostsByCategoryApi(active, pageNum)
        : await getAllPostsApi(pageNum)
      const { content, number, totalPages } = res.data
      set(s => ({
        posts: append ? [...s.posts, ...content] : content,
        page: number,
        hasMore: number < totalPages - 1,
      }))
    } catch {}
    finally { set({ loading: false, loadingMore: false }) }
  },
  removePost: (id) => set(s => ({ posts: s.posts.filter(p => p.id !== id) })),
}))
