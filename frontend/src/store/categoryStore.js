import { create } from 'zustand'
import { getCategoriesApi } from '../api/category'

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loaded: false,
  fetch: async () => {
    if (get().loaded) return
    try {
      const res = await getCategoriesApi()
      const categories = Object.entries(res.data).map(([id, name]) => ({ id, name }))
      set({ categories, loaded: true })
    } catch {}
  },
}))
