import client from './client'

export const loginApi = (username, password) =>
  client.post('/api/auth', { username, password })

export const registerApi = (email, username, password, major) =>
  client.post('/api/user/save', { email, username, password, major })
