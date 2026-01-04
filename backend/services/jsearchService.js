import axios from 'axios'

const API_HOST = 'jsearch.p.rapidapi.com'
const BASE_URL = `https://${API_HOST}`

export async function searchJobs({ q, page = 1, num_pages = 1 }) {
  const url = `${BASE_URL}/search`
  const headers = {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': API_HOST,
  }
  const params = {
    query: q,
    page,
    num_pages,
  }
  const { data } = await axios.get(url, { headers, params })
  return data?.data || []
}
