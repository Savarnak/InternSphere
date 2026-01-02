const normalize = (s) => (s || '').toString().trim()

export function explainFrom(description = '', skills = []) {
  const text = normalize(description)
  const lower = text.toLowerCase()

  const sections = {
    what: '',
    skills: [],
    who: '',
    growth: '',
  }

  // Extract skills: prefer provided list; fallback to naive parse
  sections.skills = Array.isArray(skills) && skills.length
    ? skills
    : Array.from(new Set(text.match(/\b[A-Z][A-Za-z+\.\/#0-9 ]{1,20}\b/g) || [])).slice(0, 8)

  // Heuristics: look for cue words
  const parts = text.split(/\.(\s+|$)/).map((p) => p && p.trim()).filter(Boolean)
  const whatSentences = []
  const whoSentences = []
  const growthSentences = []

  parts.forEach((p) => {
    const l = p.toLowerCase()
    if (/(responsib|build|work|develop|design|analy)/.test(l)) whatSentences.push(p)
    if (/(should apply|ideal|who should|fit)/.test(l)) whoSentences.push(p)
    if (/(growth|exposure|learn|opportun|mentors?)/.test(l)) growthSentences.push(p)
  })

  sections.what = whatSentences.join('. ') || text.slice(0, 160)
  sections.who = whoSentences.join('. ')
  sections.growth = growthSentences.join('. ')

  return sections
}
