import client from './client'

export const createPostApi = (title, content, categoryId) =>
  client.post('/api/post/save', { title, content, categoryId })

export const getAllPostsApi = (page = 0, size = 10) =>
  client.get('/api/post/getAll', { params: { page, size } })

export const getPostsByUsernameApi = (username, page = 0, size = 10) =>
  client.get(`/api/post/getAll/user/${username}`, { params: { page, size } })

export const getPostsByCategoryApi = (categoryId, page = 0, size = 10) =>
  client.get(`/api/post/getAll/category/${categoryId}`, { params: { page, size } })

export const getPostByIdApi = (id) =>
  client.get(`/api/post/get/${id}`)

export const deletePostApi = (id) =>
  client.delete(`/api/post/delete/${id}`)
