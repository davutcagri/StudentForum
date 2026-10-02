import { create } from 'zustand'
import { getAllUsersApi } from '../api/user'

export const useUserStore = create((set, get) => ({
  users: [],
  loaded: false,
  loading: false,
  load: async () => {
    if (get().loaded || get().loading) return
    set({ loading: true })
    try {
      const res = await getAllUsersApi()
      set({ users: res.data, loaded: true, loading: false })
    } catch {
      set({ loading: false })
    }
  },
}))
