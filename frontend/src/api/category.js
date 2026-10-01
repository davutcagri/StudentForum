import client from './client'

export const getCategoriesApi = () => client.get('/api/category/getAll')
