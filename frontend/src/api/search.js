import client from './client'

export const searchUsersApi = (text, page = 0, size = 10) =>
  client.get('/api/search/users', { params: { text, page, size } })
