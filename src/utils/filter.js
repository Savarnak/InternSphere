const norm = (s) => (s || '').toString().toLowerCase()

export function filterInternships(data, { query = '', locations = [], sources = [], modes = [], skills = [] } = {}) {
  const q = norm(query)
  const locs = new Set(locations.map(norm))
  const srcs = new Set(sources.map(norm))
  const mds = new Set(modes.map(norm))
  const sks = new Set(skills.map(norm))

  return data.filter((d) => {
    const haystack = `${d.title} ${d.company} ${d.location} ${d.skills.join(' ')}`.toLowerCase()
    if (q && !haystack.includes(q)) return false

    if (locs.size && !locs.has(norm(d.location))) return false
    if (srcs.size && !srcs.has(norm(d.source))) return false
    if (mds.size && !mds.has(norm(d.mode))) return false
    if (sks.size && !d.skills.some((s) => sks.has(norm(s)))) return false

    return true
  })
}

export function getFacetOptions(data) {
  const uniq = (arr) => Array.from(new Set(arr)).sort((a,b) => a.localeCompare(b))
  return {
    locations: uniq(data.map((d) => d.location)),
    sources: uniq(data.map((d) => d.source)),
    modes: uniq(data.map((d) => d.mode)),
    skills: uniq(data.flatMap((d) => d.skills)),
  }
}
