import axios from 'axios'

const BASE_URL = 'https://api.adzuna.com/v1/api/jobs'

function buildWhatParams(q) {
  // Provide broad coverage for internship-like roles
  const defaults = ['intern', 'internship', 'trainee', 'fresher']
  if (!q) return { what_or: defaults.join(',') }
  const tokens = q
    .toString()
    .toLowerCase()
    .replace(/\bor\b/g, ' ')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
  const terms = Array.from(new Set([...tokens, ...defaults]))
  return { what_or: terms.join(',') }
}

export async function searchAdzuna({ q, page = 1, results_per_page = 25 }) {
  const app_id = process.env.ADZUNA_APP_ID
  const app_key = process.env.ADZUNA_APP_KEY
  if (!app_id || !app_key) return []

  const country = process.env.ADZUNA_COUNTRY || 'in' // default to India
  const url = `${BASE_URL}/${country}/search/${page}`
  const params = {
    app_id,
    app_key,
    ...buildWhatParams(q),
    results_per_page,
  }
  try {
    const { data } = await axios.get(url, { params, headers: { Accept: 'application/json' } })
    return data?.results || []
  } catch (e) {
    console.warn('Adzuna request failed:', e?.response?.status, e?.response?.statusText)
    return []
  }
}
