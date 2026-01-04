export default function normalizeAdzunaJob(raw) {
  const id = raw.id || `${raw.title}-${raw.company?.display_name || ''}`.replace(/\s+/g, '-').toLowerCase()
  const title = raw.title || 'Internship'
  const company = (raw.company && raw.company.display_name) || 'Unknown'

  const locParts = [raw.location?.area?.slice(1)?.join(', '), raw.location?.display_name].filter(Boolean)
  const location = locParts[0] || raw.location?.display_name || '—'

  const remoteFlag = /remote/i.test([raw.title, raw.description].filter(Boolean).join(' '))
  let workMode = 'On-site'
  if (remoteFlag) workMode = 'Remote'
  else if (/hybrid/i.test(raw.title || '') || /hybrid/i.test(raw.contract_time || '')) workMode = 'Hybrid'

  // postedAt: ISO string from created or redirect timestamp if any
  let postedAt = raw.created || raw.created_at
  if (!postedAt) postedAt = new Date().toISOString()

  const applyUrl = raw.redirect_url || ''

  return {
    id: String(id),
    title,
    company,
    location,
    workMode,
    postedAt,
    applyUrl,
    source: 'Adzuna',
  }
}
