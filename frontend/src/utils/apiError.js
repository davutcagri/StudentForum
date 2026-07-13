export function extractApiError(err) {
  const data = err.response?.data
  if (!data) return 'Something went wrong. Please try again.'
  if (typeof data === 'string') return data
  if (data.message) return data.message
  if (data.error) return data.error
  if (typeof data === 'object') return Object.values(data)[0]
  return 'Something went wrong. Please try again.'
}
