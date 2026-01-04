export default function normalizeNewJobsJob(raw) {
  const id = raw.id || raw._id || `${raw.title}-${raw.company || raw.company_name || ''}`.replace(/\s+/g, '-').toLowerCase()
  const title = raw.title || raw.role || 'Internship'
  const company = raw.company || raw.company_name || 'Unknown'

  const location = raw.location || raw.city || raw.region || raw.country || '—'

  const text = `${raw.title || ''} ${raw.description || ''} ${raw.tags?.join(' ') || ''}`
  const remoteFlag = /remote/i.test(text)
  let workMode = 'On-site'
  if (remoteFlag) workMode = 'Remote'
  else if (/hybrid/i.test(text)) workMode = 'Hybrid'

  let postedAt = raw.postedAt || raw.posted_at || raw.datePosted || raw.created_at
  if (typeof postedAt === 'number') postedAt = new Date(postedAt * 1000).toISOString()
  if (!postedAt) postedAt = new Date().toISOString()

  const applyUrl = raw.applyUrl || raw.url || raw.apply_url || ''

  return {
    id: String(id),
    title,
    company,
    location,
    workMode,
    postedAt,
    applyUrl,
    source: 'NewJobsAPI',
  }
}
