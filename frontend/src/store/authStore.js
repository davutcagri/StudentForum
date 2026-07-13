import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  username: null,
  initializing: true,
  login: (username) => set({ username }),
  logout: () => set({ username: null }),
  setInitialized: (username) => set({ username, initializing: false }),
}))
