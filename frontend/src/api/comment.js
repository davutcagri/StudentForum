import client from './client'

export const saveCommentApi = (content, postId) =>
  client.post('/api/comment/save', { content, postId })

export const getCommentsByPostIdApi = (postId, page = 0, size = 10) =>
  client.get(`/api/comment/getAll/${postId}`, { params: { page, size } })

export const deleteCommentApi = (id) =>
  client.delete(`/api/comment/delete/${id}`)
