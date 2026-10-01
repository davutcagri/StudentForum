import client from './client'

export const getCategoriesApi = () => client.get('/category/getAll')
