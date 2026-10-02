import client from './client'

export const getMeApi = () =>
  client.get('/api/user/me')

export const getAllUsersApi = () =>
  client.get('/api/user/getAll')

export const getUserByUsernameApi = (username) =>
  client.get(`/api/user/${username}`)

export const updateMeApi = (data) =>
  client.patch('/api/user/update/me', data)

export const deleteMeApi = () =>
  client.delete('/api/user/delete/me')
