import { create } from 'zustand'
import { getCategoriesApi } from '../api/category'

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loaded: false,
  loading: false,
  load: async () => {
    if (get().loaded || get().loading) return
    set({ loading: true })
    try {
      const res = await getCategoriesApi()
      const categories = Object.entries(res.data).map(([id, name]) => ({ id, name }))
      set({ categories, loaded: true, loading: false })
    } catch {
      set({ loading: false })
    }
  },
}))
