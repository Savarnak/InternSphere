export default function normalizeJob(raw) {
  const id = raw.job_id || `${raw.job_title}-${raw.employer_name}-${raw.job_city || ''}`.replace(/\s+/g, '-').toLowerCase()
  const title = raw.job_title || 'Internship'
  const company = raw.employer_name || 'Unknown'

  const city = raw.job_city || raw.job_country || raw.job_state || ''
  const remoteFlag = (raw.job_is_remote || false) || /remote/i.test(`${raw.job_title} ${raw.job_description || ''}`)
  const employmentType = (raw.job_employment_type || '').toLowerCase()

  let workMode = 'On-site'
  if (remoteFlag) workMode = 'Remote'
  else if (/hybrid/i.test(employmentType) || /hybrid/i.test(raw.job_title || '')) workMode = 'Hybrid'

  const location = city || (remoteFlag ? 'Remote' : '—')

  // postedAt: use job_posted_at_datetime_utc or job_posted_at_timestamp
  let postedAt = raw.job_posted_at_datetime_utc || raw.job_posted_at_timestamp
  if (typeof postedAt === 'number') postedAt = new Date(postedAt * 1000).toISOString()
  if (!postedAt) postedAt = new Date().toISOString()

  const applyUrl = raw.job_apply_link || raw.job_google_link || raw.job_offer_expiration_datetime_utc || raw.job_apply_is_direct || raw.job_apply_quality_score ? (raw.job_apply_link || raw.job_google_link) : raw.job_google_link

  return {
    id: String(id),
    title,
    company,
    location,
    workMode,
    postedAt,
    applyUrl: applyUrl || '',
    source: 'JSearch',
  }
}
