import axios from 'axios'

// Generic jobs API client; expects NEW_JOBS_API_URL to point to a search endpoint
// that accepts a query parameter `q`. Optional headers can be provided via
// NEW_JOBS_API_KEY and NEW_JOBS_API_HOST.
export async function searchNewJobs({ q, page = 1 }) {
  const baseUrl = process.env.NEW_JOBS_API_URL
  if (!baseUrl) return []

  const params = { q, page }
  const headers = {}
  if (process.env.NEW_JOBS_API_KEY) headers['x-api-key'] = process.env.NEW_JOBS_API_KEY
  if (process.env.NEW_JOBS_API_HOST) headers['x-api-host'] = process.env.NEW_JOBS_API_HOST

  try {
    const { data } = await axios.get(baseUrl, { params, headers })
    // Accept either array or wrapped {data: []}
    if (Array.isArray(data)) return data
    if (Array.isArray(data.items)) return data.items
    if (Array.isArray(data.data)) return data.data
    return []
  } catch (e) {
    console.warn('NewJobsAPI request failed:', e?.response?.status, e?.response?.statusText)
    return []
  }
}
