import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  username: null,
  initializing: true,
  login: (username, token) => {
    localStorage.setItem('AUTH-TOKEN', token)
    set({ username })
  },
  logout: () => {
    localStorage.removeItem('AUTH-TOKEN')
    set({ username: null })
  },
  setInitialized: (username) => set({ username, initializing: false }),
}))
