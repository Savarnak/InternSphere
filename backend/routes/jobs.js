import { Router } from 'express'
import { searchJobs } from '../services/jsearchService.js'
import { searchAdzuna } from '../services/adzunaService.js'
import normalizeJob from '../utils/normalizeJob.js'
import normalizeAdzunaJob from '../utils/normalizeAdzunaJob.js'
// NewJobsAPI integration removed per request

const router = Router()

// GET /api/jobs
// Query params: q (search query), page (optional), num_pages (optional)
router.get('/', async (req, res, next) => {
  try {
    const q = req.query.q || 'intern OR internship OR trainee OR fresher'
    const page = req.query.page ? Number(req.query.page) : 1
    const num_pages = req.query.num_pages ? Number(req.query.num_pages) : 1

    const internshipRegex = /(intern|internship|trainee|fresher)/i

    const [jsearchRaw, adzunaRaw] = await Promise.all([
      searchJobs({ q, page, num_pages }),
      searchAdzuna({ q, page, results_per_page: 25 }),
    ])

    const jsearchNormalized = (jsearchRaw || [])
      .filter((r) => internshipRegex.test(`${r.job_title} ${r.job_employment_type}`))
      .map((r) => normalizeJob(r))

    const adzunaNormalized = (adzunaRaw || [])
      .filter((r) => internshipRegex.test(`${r.title} ${r.contract_time || ''}`))
      .map((r) => normalizeAdzunaJob(r))

    // Merge and dedupe by title+company (case-insensitive)
    const map = new Map()
    for (const item of [...jsearchNormalized, ...adzunaNormalized]) {
      const key = `${(item.title || '').toLowerCase()}::${(item.company || '').toLowerCase()}`
      if (!map.has(key)) map.set(key, item)
    }

    const items = Array.from(map.values())
    res.json({ items })
  } catch (err) {
    next(err)
  }
})

export default router
