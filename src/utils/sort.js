const cache = new Map()

function parsePostedAtScore(str = '') {
  const key = `pa:${str}`
  if (cache.has(key)) return cache.get(key)
  const s = (str || '').toString().toLowerCase().trim()
  let days = 1000
  if (s === 'today') days = 0
  else if (/^(\d+)d/.test(s)) days = parseInt(s, 10)
  else if (/^(\d+)w/.test(s)) days = parseInt(s, 10) * 7
  else if (/^(\d+)m/.test(s)) days = parseInt(s, 10) * 30
  const score = -days // newer is larger
  cache.set(key, score)
  return score
}

export function sortByLatest(items) {
  return [...items].sort((a, b) => parsePostedAtScore(b.postedAt) - parsePostedAtScore(a.postedAt))
}

export function sortByMatch(items, scoresMap) {
  if (!scoresMap) return items
  return [...items].sort((a, b) => (scoresMap.get(b.id) || 0) - (scoresMap.get(a.id) || 0))
}
