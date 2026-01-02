const DOMAIN_MAP = {
  'Frontend': ['React', 'JavaScript', 'CSS', 'HTML', 'Tailwind', 'TypeScript'],
  'Backend': ['Node.js', 'Express', 'REST', 'MongoDB', 'PostgreSQL', 'SQL'],
  'Full Stack': ['React', 'Node.js', 'Express', 'REST', 'PostgreSQL', 'MongoDB', 'Tailwind'],
  'Data Science': ['Python', 'Pandas', 'ML', 'SQL', 'NumPy'],
  'UI/UX': ['Figma', 'Prototyping', 'Wireframing'],
  'Mobile': ['React Native', 'Android', 'iOS', 'TypeScript'],
  'DevOps': ['Docker', 'CI/CD', 'AWS', 'Linux', 'Kubernetes'],
  'Cybersecurity': ['Network Security', 'Python', 'SIEM'],
}

const norm = (s) => (s || '').toString().toLowerCase()

export function recommendWithScores(profile, data, max = 6) {
  const { domain, location } = profile || {}
  const domainSkills = new Set((DOMAIN_MAP[domain] || []).map(norm))
  const preferredLocation = norm(location)

  const scored = data.map((d) => {
    const skillMatches = d.skills.reduce((acc, s) => acc + (domainSkills.has(norm(s)) ? 1 : 0), 0)
    const locationBoost = preferredLocation && norm(d.location) === preferredLocation ? 2 : 0
    const remoteBoost = preferredLocation && preferredLocation === 'remote' && norm(d.mode) === 'remote' ? 1 : 0
    const score = skillMatches * 2 + locationBoost + remoteBoost
    return { item: d, score }
  })

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
}

export function recommend(profile, data, max = 6) {
  return recommendWithScores(profile, data, max).map((x) => x.item)
}
